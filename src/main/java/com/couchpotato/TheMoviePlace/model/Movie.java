package com.couchpotato.TheMoviePlace.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name="movie")
public class Movie implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false,updatable=false)
	private Long id;
	private String name;
	private String releaseYear;
	private Float rating;
	private String director;
	
	@ElementCollection
	@OneToMany(cascade= {CascadeType.ALL})
	@PrimaryKeyJoinColumn(name = "actor_id")
	private List<Actor> cast;
	
	private String review;
	private String watchPlatform;
	private String description;
	private String imageUrl;
	private String language;
	private String genre;
	
	public Movie(Long id, String name, String releaseYear, Float rating, String director, List<Actor> cast, String review,
			String watchPlatform, String description, String imageUrl,String language,String genre) {
		super();
		this.id = id;
		this.name = name;
		this.releaseYear = releaseYear;
		this.rating = rating;
		this.director = director;
		this.cast = cast;
		this.review = review;
		this.watchPlatform = watchPlatform;
		this.description = description;
		this.imageUrl = imageUrl;
		this.language=language;
		this.genre=genre;
	}
	public Movie() {
		
	}

	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		this.genre = genre;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
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

	public String getReleaseYear() {
		return releaseYear;
	}

	public void setReleaseYear(String releaseYear) {
		this.releaseYear = releaseYear;
	}

	public Float getRating() {
		return rating;
	}

	public void setRating(Float rating) {
		this.rating = rating;
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public List<Actor> getCast() {
		return cast;
	}

	public void setCast(List<Actor> cast) {
		this.cast = cast;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public String getWatchPlatform() {
		return watchPlatform;
	}

	public void setWatchPlatform(String watchPlatform) {
		this.watchPlatform = watchPlatform;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	@Override
	public String toString() {
		return "Movie [id=" + id + ", name=" + name + ", releaseYear=" + releaseYear + ", rating=" + rating
				+ ", director=" + director + ", cast=" + cast + ", review=" + review + ", watchPlatform="
				+ watchPlatform + ", description=" + description + ", imageUrl=" + imageUrl + ", language=" + language
				+ ", genre=" + genre + "]";
	}


	
}
