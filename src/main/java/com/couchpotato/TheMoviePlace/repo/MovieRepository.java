package com.couchpotato.TheMoviePlace.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.couchpotato.TheMoviePlace.model.Movie;

public interface MovieRepository extends JpaRepository<Movie,Long>{
	
	public List<Movie> findAllByNameContaining(String name);
	
	public List<Movie> findAllByCastNameContaining(String cast);
	
	public List<Movie> findAllByDirectorContaining(String Director);
}
