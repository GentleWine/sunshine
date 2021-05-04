package com.sunshine.alpha;

import com.auth0.jwt.JWT;
import com.sunshine.alpha.component.TokenConfig;
import com.sunshine.alpha.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class AlphaApplicationTests {
    @Autowired
    TokenConfig tokenConfig;

    @Test
    void contextLoads() {
        String token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdW5zaGluZSIsImV4cCI6MTYxMTIyNDA2NCwidHlwZSI6InZlcmlmeWNvZGUifQ.zpAYJiYGPWQ_RZAYi-Bo22xFGMfpRfdHwb048QfQWPs";

        System.out.println(JWT.decode(token).getPayload());
    }

}
