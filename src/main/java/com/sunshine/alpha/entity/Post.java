package com.sunshine.alpha.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.DynamicInsert;

@DynamicInsert
@DynamicUpdate
@Data
@Entity
@Table(name = "post")
public class Post  implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "user_phone")
	private String userPhone;

	@Column(name = "user_email")
	private String userEmail;
    //文章的类型，1代表帖子，0代表博文
	private boolean type;

	private String title;

	private String content;

	private String pic;

	private java.sql.Date time;

	private String tag1;

	private String tag2;

	private String tag3;

	//浏览量
	@Column(name = "PV")
	private BigDecimal pv;
	//点赞次数
	@Column(name = "LT")
	private BigDecimal lt;
	//收藏次数
	@Column(name = "NOC")
	private BigDecimal noc;
	//标记为哪种类型的文章
	private char flag;

}
