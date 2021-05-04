package com.sunshine.alpha.bean;

import lombok.Data;

@Data
public class RegisterRequest{
    //TODO: 手机号邮箱验证待实现，昵称敏感文字检查待实现。
    //TODO: 注册请求体参数要求再根据数据库构成优化。
    //手机号
    private String phone;
    //邮箱
    private String email;
    //密码（至少8位，并且含有大小写字母各至少一个)
    private String password;
    //验证码
    private String verifycode;
    //昵称
    private String nickname;
    //性别 M代表男性 F代表女性 N代表保密
    private String sex;
    //年龄
    private int age;
}
