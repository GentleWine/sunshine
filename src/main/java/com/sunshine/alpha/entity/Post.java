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
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@Column(name = "user_phone")
	private String userPhone;

	@Column(name = "user_email")
	private String userEmail;

	private boolean type;

	private String title;

	private String content;

	private String pic;

	private java.sql.Date time;

	private String tag1;

	private String tag2;

	private String tag3;

	@Column(name = "PV")
	private BigDecimal pv;

	@Column(name = "LT")
	private BigDecimal lt;

	@Column(name = "NOC")
	private BigDecimal noc;

	private String flag;

}
