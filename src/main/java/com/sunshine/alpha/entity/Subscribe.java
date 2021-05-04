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
@Table(name = "subscribe")
public class Subscribe  implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@Column(name = "fans_email")
	private String fansEmail;

	@Column(name = "fans_phone")
	private String fansPhone;

	@Column(name = "author_email")
	private String authorEmail;

	@Column(name = "author_phone")
	private String authorPhone;

	private java.util.Date time;

}
