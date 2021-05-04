package com.sunshine.alpha.util;

import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Random;

public class RandomUtil {
    private static final char[] CHARS={'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J',
            'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
            'X', 'Y', 'Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
            'q','r','s','t','u','v','w','x','y','z', '2', '3', '4', '5', '6', '7', '8', '9'};

    //测试方法
//    public static void main(String[] args) {
//        RandomUtil randomUtil=new RandomUtil();
//        System.out.println(randomUtil.randomStr(5));
//        //创建面板对象
//        Panel panel=new Panel();
//        //获取绘图对象
//        panel.setBackground(randomUtil.randomColor(40,150));
//        //创建窗体
//        JFrame jFrame=new JFrame();
//        jFrame.setTitle("color");
//        jFrame.setSize(500,500);
//        jFrame.setDefaultCloseOperation(jFrame.EXIT_ON_CLOSE);
//        jFrame.add(panel);
//        jFrame.setVisible(true);
//        //创建面板
//    }

    //生成长度为n的随机字符串
    public static String randomStr(int strlen)
    {
        Random random =new Random();
        StringBuilder str=new StringBuilder();
        while((strlen--)>0){
            str.append(CHARS[random.nextInt(CHARS.length)]);
        }
        return str.toString();
    }
    //生成像素值[min,max)的随机颜色
    public static Color randomColor(int min,int max)
    {
        Random random=new Random();
        if(min>255) min=255;
        if(max>255) max=255;
        return new Color(random.nextInt(max-min)+min,random.nextInt(max-min)+min,random.nextInt(max-min)+min);
    }
}
