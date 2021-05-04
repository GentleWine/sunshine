package com.sunshine.alpha.controller;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.JWT;
import com.sunshine.alpha.bean.HTMUpload;
import com.sunshine.alpha.entity.Picture;
import com.sunshine.alpha.entity.Post;
import com.sunshine.alpha.repository.PictureDAO;
import com.sunshine.alpha.repository.PostDAO;
import com.sunshine.alpha.repository.UserRepository;
import com.sunshine.alpha.util.RandomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.sql.Date;
import java.util.Objects;

//文件上传
//内容参数必填，无内容即报错
@RestController
public class FileUpload {
    //文件最大重名次数
    public static final int MAX_REP=10;
    //文件随机名称长度
    public static final int RAND_LEN=15;
    //用户空间大小(bytes)
    public static final int MAX_SPACE=1024*1024*1024;//1G,TODO：在配置文件中配置
    @Autowired
    UserRepository userRepository;
    @Autowired
    PictureDAO pictureDAO;
    @Autowired
    PostDAO postDAO;

    //用户dest生成方法
    //不存在父目录会自动创建
    //@param：root根目录(末尾带/)，username用户文件夹名称，suffix文件后缀(以.开头)
    //@throws: 抛出运行时异常，排除地址信息填写错误
    public static File mkdest(String root,String account,String suffix) throws Exception
    {
        //地址初始化
        //TODO:日后多线程优化为StringBuffer
        StringBuilder path=new StringBuilder(root+account+'/');
        //文件指针
        File fileptr;
        //重名计数器
        int counter=MAX_REP;
        //文件存储名
        //防止重名
        do {
            counter--;
            String imgname = RandomUtil.randomStr(RAND_LEN);
            path.append(imgname).append(suffix);
            fileptr=new File(path.toString()).getAbsoluteFile();
        }
        while (fileptr.exists()&&counter>0);

        if(!fileptr.exists()) {
            //如果无父目录，则创建父目录(排除非法指向）
            //用户程序文件夹管理权限范围不包括用户目录级别之上的目录（由服务器管理员后台管理服务器文件系统）
            if (!fileptr.getParentFile().exists()) {
                if(!fileptr.getParentFile().getParentFile().exists())
                {
                    throw new Exception("destination does not exist!");
                }
                boolean iscreated = fileptr.getParentFile().mkdir();
                if (!iscreated) {
                    throw new Exception("fail to create parent path!");
                }
            }
            return fileptr;
        }
        else {
            throw new Exception("the namespace is small!");
        }

    }

    //图片传输
    //前端数据类型：multipart/form-data
    //@param: MultipartFile类用于文件上传
    @RequestMapping(value = "/upload/img",method = RequestMethod.POST)
    public JSONObject uploadimg(MultipartFile file, HttpServletRequest request)
    {
        //图片存储根目录
        String root="/home/ubuntu/sunshine/resource/image/";
        //文件指针
        File fileptr = null;
        try {
            //排除无内容
            if (!file.isEmpty()) {
                //取出phone
                String token=request.getHeader("Token");
                String phone=JWT.decode(token).getAudience().get(1);//phone签名在第2个，参见Login.java
                //取出email
                String email = JWT.decode(token).getAudience().get(0);
                //查询数据库，判断用户存储是否超量
                if(userRepository.findByPhone(phone).get(0).getSpace()+file.getSize()>MAX_SPACE)
                {
                    throw new Exception("insufficient user storage!");
                }

                String type = Objects.requireNonNull(file.getContentType()).toLowerCase();//防止出现空指针问题
                if (type.contains("png")) {
                    fileptr=mkdest(root,phone,".png");
                } else if (type.contains("jpg")) {
                    fileptr=mkdest(root,phone,".jpg");
                } else {
                    fileptr=mkdest(root,phone,".jpeg");
                }
                    //存储数据
                    file.transferTo(fileptr);

                    //存储信息入数据库（存储位置及大小）
                    //存入图片信息入数据库
                    Picture picture = new Picture();
                    //存入图片名
                    picture.setPicRoute(fileptr.getName());
                    Date date = new Date(System.currentTimeMillis());
                    picture.setTime(date);
                    picture.setUserEmail(email);
                    picture.setUserPhone(phone);
                    pictureDAO.save(picture);


                    //返回文件名和图片id
                    JSONObject json = new JSONObject();
                    json.put("status","success");
                    json.put("filename", fileptr.getName());
                    return json;

            }

            else {
                throw new Exception("empty content!");
            }

        }
        catch (Exception e)
        {
            e.printStackTrace();
            //TODO: 进行异常优化
            //删除文件
            if (fileptr != null) fileptr.delete();
            JSONObject json =new JSONObject();
            json.put("status","fail");
            json.put("error",e.getMessage());
            return json;
        }

    }

    //富文本传输
    //前端数据类型：application/x-www-form-urlencoded
    @RequestMapping(value="/upload/htm",method = RequestMethod.POST)
    public JSONObject uploadhtm(HttpServletRequest request, @RequestBody  HTMUpload htmUpload)
    {
        //存储根目录
        String root="/home/ubuntu/sunshine/resource/html/";
        //文件指针
        File fileptr = null;
        try{
            //取手机号
            String token=request.getHeader("Token");
            String phone=JWT.decode(token).getAudience().get(1);
            //取email
            String email = JWT.decode(token).getAudience().get(0);
            //获取文件指针
            fileptr=mkdest(root,phone,".html");
            //文本写入
            //TODO:根据文本长度判断是否能写。

            //append:true,代表追加写而不是覆盖写
            FileWriter fileWriter=new FileWriter(fileptr,true);
            //使用缓冲区，加快写速
            BufferedWriter bufferedWriter=new BufferedWriter(fileWriter);
            bufferedWriter.write(htmUpload.getHtm());
            bufferedWriter.close();
            //信息记入数据库
            Post post = new Post();
            //存入富文本名
            post.setContent(fileptr.getName());
            post.setUserEmail(email);
            post.setUserPhone(phone);
            post.setTitle(htmUpload.getTitle());
            post.setType(htmUpload.isType());
            post.setPic(htmUpload.getPic());
            //接收富文本传输的时间
            //TODO: 时间格式的设置
            post.setTime(new Date(System.currentTimeMillis()));
            postDAO.save(post);

            //返回文件名
            JSONObject json=new JSONObject();
            json.put("status","success");
            json.put("filename",fileptr.getName());
            return json;
        }
        catch (Exception e)
        {
            //TODO: 进行异常优化
            //删除文件
            if (fileptr != null) fileptr.delete();
            JSONObject json=new JSONObject();
            json.put("status","fail");
            json.put("error",e.getMessage());
            return json;
        }

    }

}
