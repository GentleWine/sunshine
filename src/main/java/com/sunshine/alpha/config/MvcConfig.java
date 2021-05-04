package com.sunshine.alpha.config;

import com.sunshine.alpha.component.LoginInterrupter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Bean
    public HandlerInterceptor getlogininterrupter()
    {
        return new LoginInterrupter();
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("home");
        registry.addViewController("/index.html").setViewName("home");
        registry.addViewController("/home").setViewName("userspace");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(getlogininterrupter()).addPathPatterns("/**").excludePathPatterns("/","/index.html","/user/login","/verify","/getverified","/**/*.html","/**/*.css","/**/*.js","/**/*.ico","/**/*.png","/**/*.jpg","/**/*.jpeg","/error","/register","/test");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //TODO:待修正
        String path;
        String winpath="file:D:/IMG/";
        String linpath="file:/home/ubuntu/sunshine/resource/image/";
        String osname=System.getProperty("os.name");
        if(osname.toLowerCase().contains("win"))
        {
            path=winpath;
        }
        else
            {
                path=linpath;
            }
        registry.addResourceHandler("/getimage/**").addResourceLocations(path);
        //添加富文本映射
        registry.addResourceHandler("/gethtml/**").addResourceLocations("file:/home/ubuntu/sunshine/resource/html/");
    }
}
