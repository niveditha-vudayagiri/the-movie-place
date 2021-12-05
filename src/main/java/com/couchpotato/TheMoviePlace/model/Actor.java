package com.couchpotato.TheMoviePlace.model;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name="actor")
public class Actor implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false,updatable=false)
	private Long id;
	
	@Column(unique=true)
	private String name;
	private int age;
	private String imageUrl;
	
	public Actor() {
		
	}
	public Actor(Long id, String name, int age, String imageUrl) {
		super();
		this.id = id;
		this.name = name;
		this.age = age;
		this.imageUrl = imageUrl;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	@Override
	public String toString() {
		return "Actor [id=" + id + ", name=" + name + ", age=" + age + ", imageUrl=" + imageUrl + "]";
	}
	
	
}
