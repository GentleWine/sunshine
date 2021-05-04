package com.sunshine.alpha.controller;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.sunshine.alpha.component.TokenConfig;
import com.sunshine.alpha.entity.User;
import com.sunshine.alpha.repository.UserRepository;
import com.sunshine.alpha.util.Convert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

//注销
@RestController
public class Cancel {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenConfig tokenConfig;
    //@Param: verifytoken为所传验证码的token, verifycode为验证码
    @RequestMapping(value = "/user/cancel",method = RequestMethod.GET)
    public JSONObject cancel(HttpServletRequest request, @RequestParam("verifytoken")String verifytoken,
                             @RequestParam("verifycode")String verifycode)
    {
        try {
            //注销鉴权
            verifycode = verifycode.toUpperCase();
            VerifyCode.messageDigest.update(verifycode.getBytes());
            String digest = Convert.byteArrayToHex(VerifyCode.messageDigest.digest());

            JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(tokenConfig.secret))
                    .withClaim("type","verifycode")
                    .withClaim("code",digest)
                    .build();
            jwtVerifier.verify(verifytoken);

            //进行注销
            String token = request.getHeader("Token");
            String phone = JWT.decode(token).getAudience().get(1);
            List<User> users = userRepository.findByPhone(phone);
            if(users.isEmpty())
            {
                throw new Exception("This account does not exist!");
            }
            User user = users.get(0);
            user.setFlag(false);
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
