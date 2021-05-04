package com.sunshine.alpha.POJO;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Date;

@Data
public class Artiinf {
    private String name;
    private Date time;
    private String title;
    private String tag1;
    private String tag2;
    private String tag3;
    //浏览量
    private BigDecimal PV;
    //点赞次数
    private BigDecimal LT;
    //收藏次数
    private BigDecimal NOC;
    //封面图名
    private String pic;
}
