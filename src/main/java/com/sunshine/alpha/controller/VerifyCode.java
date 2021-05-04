package com.sunshine.alpha.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.sunshine.alpha.component.TokenConfig;
import com.sunshine.alpha.util.Convert;
import com.sunshine.alpha.util.RandomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
public class VerifyCode {
    //验证码加密算法
    public static MessageDigest messageDigest;

    //初始化验证码加密器
    static {
        try {
            messageDigest = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    };

    private static final String[] FONT_TYPES = { "u5b8bu4f53", "u65b0u5b8bu4f53", "u9ed1u4f53", "u6977u4f53", "u96b6u4e66" };
    //验证码设置60秒过期时间
    private static final int expiretime=60000;
    //装载token配置类
    @Autowired
    private TokenConfig tokenConfig;
    @RequestMapping(value = "/getverified",method = RequestMethod.GET)
    //第三个参数属于配置类
    public void getImage(HttpServletRequest request, HttpServletResponse response, @RequestParam("width")int width, @RequestParam("height")int height)
    {
        //问题：目前不知道该方法匹配不到值时返回什么
        String plength=request.getParameter("length");
        int length=4;
        if(plength!=null&&Integer.parseInt(plength)>4) {
            length = Integer.parseInt(plength);
        }
        try{
            BufferedImage bufferedImage= new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
            Graphics2D graphics=bufferedImage.createGraphics();
            //生成背景
            graphics.setColor(Color.white);
            graphics.fillRect(0,0,width,height);

            //生成随机划线
            Random random=new Random();
            for(int i=0;i<10;i++)
            {
                graphics.setColor(RandomUtil.randomColor(30,220));
                int x0=random.nextInt(width);
                int y0=random.nextInt(height);
                int x1=random.nextInt(width);
                int y1=random.nextInt(height);
                graphics.drawLine(x0,y0,x1,y1);
            }
            //加入随机字符串
            //FontMetrics fm=graphics.getFontMetrics();
            String code=RandomUtil.randomStr(length).toUpperCase();
//            request.getSession().setAttribute("code",code);
            FontMetrics fontMetrics;
            for(int i=0;i<code.length();i++) {
                String substr=code.substring(i,i+1);

                graphics.setColor(RandomUtil.randomColor(110, 150));
                graphics.setFont(new Font(FONT_TYPES[random.nextInt(FONT_TYPES.length)],Font.BOLD, Math.max((height / 2 - (length - 4)), 1)));
                fontMetrics=graphics.getFontMetrics();
                graphics.drawString(substr, (2*i+1)*width / (2f*length)-0.5f*fontMetrics.getWidths()[substr.charAt(0)], height*(random.nextFloat()*0.5f+0.3f)+0.5f*(fontMetrics.getAscent()-fontMetrics.getDescent()));
            }


            ByteArrayOutputStream outputStream=new ByteArrayOutputStream();
            ImageIO.write(bufferedImage,"png",outputStream);
            byte[] image = outputStream.toByteArray();

            response.setHeader("Cache-Control","no-cache");
            response.setHeader("Pragma","no-cache");
            response.setDateHeader("Expire",0);
            //生成token
            //对code进行SHA256加密
            messageDigest.update(code.getBytes());
            String digest = Convert.byteArrayToHex(messageDigest.digest());



            //进行签名
            String token=JWT.create().withHeader(tokenConfig.header).withExpiresAt(new Date(System.currentTimeMillis()+expiretime))
                    .withClaim("iss",tokenConfig.issuer)
                    .withClaim("type","verifycode")
                    .withClaim("code",digest)
                    .sign(Algorithm.HMAC256(tokenConfig.secret));

            //放入cookie
            Cookie cookie =new Cookie("Token",token);
            response.addCookie(cookie);

            response.setContentType("image/png;charset=UTF-8");
            response.getOutputStream().write(image);
//            刷新并写出
            response.getOutputStream().flush();

        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }
    @Deprecated
    @RequestMapping(value = "/verify",method = RequestMethod.POST)
    public void verify(HttpServletRequest request,HttpServletResponse response)
    {
        try {
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expire", 0);
            response.setContentType("application/json;charset=utf-8");

            String verifyCode = request.getParameter("verifyCode");

            String code = String.valueOf(request.getSession().getAttribute("code"));
            Object timestamp = request.getSession().getAttribute("timestamp");
            if (code != null && timestamp != null && (System.currentTimeMillis() - Long.parseLong(String.valueOf(timestamp))) < 120 && code.equals(verifyCode))
            {
                Map<String,String> map=new HashMap<>();
                map.put("status:","success");
                response.getWriter().write(map.toString());
                response.getWriter().flush();

            } else {
                Map<String,String> map=new HashMap<>();
                map.put("status:","fail");
                response.getWriter().write(map.toString());
                response.getWriter().flush();
            }
            //请求结束后清除会话中的标识属性
            request.getSession().removeAttribute("code");
            request.getSession().removeAttribute("timestamp");
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }


}
