package com.sunshine.alpha.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.DynamicInsert;

@DynamicInsert
@DynamicUpdate
@Data
@Entity
@Table(name = "picture")
public class Picture  implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "pic_route")
	private String picRoute;

	@Column(name = "post_content")
	private String postContent;

	@Column(name = "user_phone")
	private String userPhone;

	@Column(name = "user_email")
	private String userEmail;

	private java.util.Date time;

}
