package com.sunshine.alpha.controller;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.sunshine.alpha.bean.LoginRequest;
import com.sunshine.alpha.component.TokenConfig;
import com.sunshine.alpha.entity.User;
import com.sunshine.alpha.repository.UserRepository;
import com.sunshine.alpha.util.Convert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
public class Login {

//    @Autowired
//    UserRepository userRepository;
//    @RequestMapping("/user/login")
//    public RedirectView login(@RequestParam("account")String account, @RequestParam("password")String password, HttpSession session)
//    {
//        RedirectView redirectView=new RedirectView();
//        redirectView.setContextRelative(false);
//        if(!userRepository.findUserByAccount(account,password).isEmpty()) {
//            session.setAttribute("account",account);
//            redirectView.setUrl("/home");
//            return redirectView;
//        }
//        else {
//            redirectView.setUrl("/");
//            return redirectView;
//        }
//    }
    @Autowired
    private UserRepository userRepository;
    //装载token配置类
    @Autowired
    private TokenConfig tokenConfig;

    @PostMapping("/user/login")
    public void login(HttpServletRequest request,HttpServletResponse response, @RequestBody LoginRequest loginrequest)
    {
                //响应体
                JSONObject json=new JSONObject();
                //响应头参数
                response.setHeader("Cache-Control", "no-cache");
                response.setDateHeader("Expire", 0);
                response.setContentType("application/json;charset=utf-8");
                //获取验证码
                boolean verified = false;
                String verifyCode = loginrequest.getVerifycode();
                //验证码大小写不敏感
                verifyCode=verifyCode.toUpperCase();
//                String code = String.valueOf(request.getParameter("sessionid").getAttribute("code"));
//                Object timestamp = request.getSession().getAttribute("timestamp");
//                 if (code != null && timestamp != null && (System.currentTimeMillis() - Long.parseLong(String.valueOf(timestamp))) < 120000 && code.equals(verifyCode))
//                    verified =true;
//                 //请求结束后清除会话中的标识属性
//                 request.getSession().removeAttribute("code");
//                 request.getSession().removeAttribute("timestamp");

                //验证token
        try {
            //加密请求体中的code
            VerifyCode.messageDigest.update(verifyCode.getBytes());
            String digest = Convert.byteArrayToHex(VerifyCode.messageDigest.digest());


            //带code值校验token
            String token = request.getHeader("Token");
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(tokenConfig.secret))
                    .withClaim("type","verifycode")
                    .withClaim("code",digest)
                    .build();


            verifier.verify(token);
            verified=true;
        }
        //存在运行时错误
        catch (Exception e)
        {
            json.put("status","fail");
            json.put("error","The authority failed!");
            json.put("reason",e.getMessage());
            json.put("contenttype",request.getContentType());
            json.put("receivedtoken",request.getHeader("Token"));
        }

        if (verified)
        {
            //满足要求的用户集
            List<User>Euser=userRepository.findByEmailAndPassword(loginrequest.getAccount(), loginrequest.getPassword());
            List<User>Puser=userRepository.findByPhoneAndPassword(loginrequest.getAccount(), loginrequest.getPassword());
                //账号密码正确
            if(!Euser.isEmpty()||!Puser.isEmpty()) {
                    //生成用户token
                    //用户phone和email
                    String phone;
                    String email;
                    boolean flag;
                if(!Euser.isEmpty())
                {
                    email=Euser.get(0).getEmail();
                    phone=Euser.get(0).getPhone();
                    flag = Euser.get(0).isFlag();
                }
                else {
                    email=Puser.get(0).getEmail();
                    phone=Puser.get(0).getPhone();
                    flag = Puser.get(0).isFlag();
                }

                if(flag) {
                    //token
                    String token = JWT.create().withHeader(tokenConfig.header).withExpiresAt(new Date(System.currentTimeMillis() + tokenConfig.reservedtime))
                            .withIssuer(tokenConfig.issuer).withAudience(email, phone).withClaim("type", "user").sign(Algorithm.HMAC256(tokenConfig.secret));
                    //放入cookie
                    Cookie cookie = new Cookie("Token", token);
                    response.addCookie(cookie);
                    json.put("status", "success");
                }
                else {
                    json.put("status","fail");
                    json.put("error","This account has already been canceled");
                }
            }
            else
                {
                    json.put("status","fail");
                    json.put("error","Account or password is wrong!");
                }
        }

        try {
            response.getWriter().write(json.toString());
            response.getWriter().flush();
        }
         catch (IOException e)
        {
            e.printStackTrace();
        }

    }

}
