package com.sunshine.alpha.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;

@RestController
public class PostTest {
    @RequestMapping(value = "/test",method = RequestMethod.POST)
    public String posttest(HttpServletRequest request)
    {
        BufferedReader bufferedReader=null;
        StringBuffer stringBuffer=new StringBuffer("");
        try {
            bufferedReader = request.getReader();
            String  str;
            while ((str=bufferedReader.readLine())!=null)
                stringBuffer.append(str);
            bufferedReader.close();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        finally{
            try{
                bufferedReader.close();
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
        }
        stringBuffer.append('\n');
        stringBuffer.append("Cookie: ");
        stringBuffer.append(request.getHeader("Cookie"));
        return stringBuffer.toString();
    }
}
