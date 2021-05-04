package com.sunshine.alpha.component;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.sunshine.alpha.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.imageio.IIOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class LoginInterrupter implements HandlerInterceptor {
    //装载token配置
    //注意！下面装载方式错误，因为Filter和Listener加载顺序优先于spring容器初始化实例
//    @Autowired
//    private TokenConfig tokenConfig;
//    现在可行了
    //private TokenConfig tokenConfig=new TokenConfig("HS256",1814400000,"13458586073");
    @Autowired
    private TokenConfig tokenConfig;
    @Autowired
    private UserRepository userRepository;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        //验证token
        try {
            String token = request.getHeader("Token");
            //对登录用户进行验证而非验证码
            JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(tokenConfig.secret)).withClaim("type", "user").build();
            jwtVerifier.verify(token);
            //检查用户是否注销
            String phone = JWT.decode(token).getAudience().get(1);
            if(userRepository.findByPhone(phone).isEmpty()||!userRepository.findByPhone(phone).get(0).isFlag())
            {
                throw new Exception();
            }
            return true;
        }
        catch (Exception e) {
            JSONObject json=new JSONObject();
            json.put("status","fail");
            json.put("error","Be interrupted!");
            try {
                response.getWriter().write(json.toString());
                response.getWriter().flush();
            }
            catch (IOException e1)
            {
                e.printStackTrace();
            }
            return false;
        }
    }
}
