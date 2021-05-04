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
@Table(name = "user")
public class User  implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	private String nickname;

	private String password;

	private String head;

	private String phone;

	private String email;

	//M代表男性 F代表女性 N代表保密
	private String sex;

	private java.sql.Date birthday;

	private String degree;

	private String work;

	private String hobby1;

	private String hobby2;

	private String hobby3;

	//以字节为单位
	private Double space;

	@Column(name = "fans_number")
	private Integer fansNumber;

	@Column(name = "interest_number")
	private Integer interestNumber;

	//true代表未注销用户，false代表注销用户(非空约束)
	private boolean flag;

	private Integer age;

}
