package com.sunshine.alpha.controller;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.sunshine.alpha.bean.RegisterRequest;
import com.sunshine.alpha.component.TokenConfig;
import com.sunshine.alpha.entity.User;
import com.sunshine.alpha.repository.UserRepository;
import com.sunshine.alpha.util.Convert;
import com.sunshine.alpha.util.Inspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class Register {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenConfig tokenConfig;
    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public JSONObject register(@RequestBody RegisterRequest registerrequest, HttpServletRequest request)
    {
        try{
            //验证码验证
            String verifycode = registerrequest.getVerifycode();
            verifycode = verifycode.toUpperCase();
            VerifyCode.messageDigest.update(verifycode.getBytes());
            String digest = Convert.byteArrayToHex(VerifyCode.messageDigest.digest());

            String token = request.getHeader("Token");
            JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(tokenConfig.secret))
                    .withClaim("type","verifycode")
                    .withClaim("code",digest)
                    .build();
            jwtVerifier.verify(token);
            //注册信息检查
            String phone = registerrequest.getPhone();
            String email = registerrequest.getEmail();
            String password = registerrequest.getPassword();
            String sex = registerrequest.getSex();
            //排除未知性别
            if (!(sex.equals("M")||sex.equals("F")||sex.equals("N")))
            {
                throw new Exception("illegal type of sex!");
            }

            int age = registerrequest.getAge();
            String nickname = registerrequest.getNickname();
            //手机号已注册
            if(!userRepository.findByPhone(phone).isEmpty())
            {
                throw new Exception("phone number has been used!");
            }
            //邮箱已注册
            if (!userRepository.findByEmail(email).isEmpty())
            {
                throw new Exception("email has been used!");
            }
            //密码不过关
            //密码不足8位
            if(password.length()<8)
            {
                throw new Exception("password is too short!");
            }
            //密码不包含足够的英文大小写
            int []result = Inspect.lettercheck(password);
            if (result[0] == 0 || result[1] == 0)
            {
                throw new Exception("password has at least one upper letter and one lower letter!");
            }
            //注册
            User user = new User();
            user.setEmail(email);
            user.setPhone(phone);
            user.setPassword(password);
            user.setNickname(nickname);
            user.setAge(age);
            user.setSex(sex);
            //用户默认为未注销用户
            user.setFlag(true);
            userRepository.save(user);

            JSONObject json = new JSONObject();
            json.put("status","success");
            return json;
        }
        catch (Exception e)
        {
            JSONObject json = new JSONObject();
            json.put("status","fail");
            json.put("error",e.getMessage());
            return json;
        }
    }
}
