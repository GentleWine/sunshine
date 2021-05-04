package com.sunshine.alpha.controller;

import com.alibaba.fastjson.JSONObject;
import com.sunshine.alpha.POJO.Artiinf;
import com.sunshine.alpha.entity.Post;
import com.sunshine.alpha.repository.PostDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Article {
    @Autowired
    PostDAO postDAO;

    //获取指定用户的文章
    //@Param: phone为所请求的用户手机号 type为文章的类型 page为当前页(从零开始） size为页大小
    @GetMapping(value = "/article/user")
    public JSONObject getuserarticles(@RequestParam("phone")String phone, @RequestParam("type")boolean type,@RequestParam("page")int page, @RequestParam("size")
                                 int size) {
        try {
            //分页查询
            Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "time");
            Page<Post> postspage = postDAO.findAllByUserPhoneAndType(phone,type,pageable);
            List<Post> posts = postspage.getContent();

            //生成响应信息集合
            ArrayList<Artiinf> infs = new ArrayList<>();
            for (Post post : posts) {
                //文章信息装载
                Artiinf artiinf = new Artiinf();
                artiinf.setName(post.getContent());
                artiinf.setTime(post.getTime());
                artiinf.setTitle(post.getTitle());
                artiinf.setLT(post.getLt());
                artiinf.setNOC(post.getNoc());
                artiinf.setPV(post.getPv());
                artiinf.setTag1(post.getTag1());
                artiinf.setTag2(post.getTag2());
                artiinf.setTag3(post.getTag3());
                artiinf.setPic(post.getPic());
                infs.add(artiinf);
            }

            JSONObject json = new JSONObject();
            json.put("status", "success");
            json.put("items", infs);
            return json;
        }
        catch (Exception e)
        {
            JSONObject json = new JSONObject();
            json.put("status","fail");
            json.put("error",e.getMessage());
            return json;
        }
    }
    //获取指定文章的评论
    //@Param：phone为所请求文章的作者手机号 postname为所请求文章的静态文件名
    @GetMapping(value = "/article/reply")
    public JSONObject getarticlereply(@RequestParam("phone")String phone, @RequestParam("postname")String postname)
    {


    }
    //对指定的文章发起评论
}
