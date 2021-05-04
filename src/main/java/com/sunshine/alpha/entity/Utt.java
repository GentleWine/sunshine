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
@Table(name = "UTT")
public class Utt  implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "test_id")
	private Integer testId;

	@Column(name = "user_email")
	private String userEmail;

	@Column(name = "user_phone")
	private String userPhone;

	private java.util.Date time;

	private Integer grade;

}
