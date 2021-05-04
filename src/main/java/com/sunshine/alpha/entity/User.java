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
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	private String nickname;

	private String password;

	private String head;

	private String phone;

	private String email;

	private Integer age;

	private String sex;

	private java.sql.Date birthday;

	private String degree;

	private String work;

	private String hobby1;

	private String hobby2;

	private String hobby3;

	private Double space;

	@Column(name = "fans_number")
	private Integer fansNumber;

	@Column(name = "interest_number")
	private Integer interestNumber;

	private boolean flag;

}
