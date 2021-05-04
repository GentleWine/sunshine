package com.sunshine.alpha.bean;

import lombok.Data;

@Data
public class HTMUpload {
    //字符流长度
    //TODO: 防止客户端欺骗行为
    private long length;
    //文章内容
    private String htm;
    //文章标题
    private String title;
    //文章类型
    private boolean type;
    //封面图
    private String pic;
    //TODO:文章权限

}
