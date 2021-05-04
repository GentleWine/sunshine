package com.sunshine.alpha.config;

import com.sunshine.alpha.component.TokenConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//自定义配置类
@Configuration
public class CustConfig {

    @Bean
    public TokenConfig tokenConfig()
    {
        return new TokenConfig("HS256",1814400000,"13458586073");
    }
}
