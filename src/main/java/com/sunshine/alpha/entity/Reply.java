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
@Table(name = "reply")
public class Reply  implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@Column(name = "remark_id")
	private Integer remarkId;

	private String content;

	@Column(name = "from_phone")
	private String fromPhone;

	@Column(name = "from_email")
	private String fromEmail;

	@Column(name = "to_phone")
	private String toPhone;

	@Column(name = "to_email")
	private String toEmail;

	private java.util.Date time;

	@Column(name = "LT")
	private Double lt;

	private String flag;

}
