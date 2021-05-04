package com.sunshine.alpha.component;

import com.alibaba.fastjson.JSONObject;

//token配置信息
public class TokenConfig {
    //加密算法
    public final String alg;
    //头部信息
    public final JSONObject header;
    //默认过期时间设为21天
    public final long reservedtime;
    //产生密钥
    public final String secret;
    //发行公司
    public final String issuer;

    public TokenConfig(String alg,long reservedtime, String secret) {
        this.reservedtime = reservedtime;
        this.secret = secret;
        this.alg=alg;
        this.issuer = "sunshine";
        header =new JSONObject();
        header.put("alg",alg);
        header.put("typ","JWT");
    }
}
