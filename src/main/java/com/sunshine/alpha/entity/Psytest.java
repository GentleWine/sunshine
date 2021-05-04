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
@Table(name = "psytest")
public class Psytest  implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	private String url;

	private String type;

	private java.util.Date time;

	private String publisher;

	private String flag;

}
