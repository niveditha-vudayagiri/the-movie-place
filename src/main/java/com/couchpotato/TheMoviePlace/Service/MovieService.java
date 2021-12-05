package com.couchpotato.TheMoviePlace.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.couchpotato.TheMoviePlace.exception.NoMovieFoundException;
import com.couchpotato.TheMoviePlace.model.Movie;
import com.couchpotato.TheMoviePlace.repo.MovieRepository;

@Service
public class MovieService {

	private MovieRepository movieRepository;
	
	@Autowired
	public MovieService(MovieRepository movieRepository) {
		this.movieRepository=movieRepository;
	}
	
	public List<Movie> GetAllMovies(int pageNumber){
		Pageable page=PageRequest.of(pageNumber-1, 10);
		return movieRepository.findAll(page).getContent();
	}
	
	public Movie GetMovieById(Long id) {
		return movieRepository.findById(id).orElseThrow(() -> new NoMovieFoundException("No movie found for the given id "+id));
	}
	
	public List<Movie> GetMoviesByName(String name,int pageNumber){
		Pageable page=PageRequest.of(pageNumber-1, 10);
		return movieRepository.findAllByNameContaining(name);
	}
	
	public List<Movie> GetMoviesByCast(String cast, int pageNumber) {
		Pageable page=PageRequest.of(pageNumber-1, 10);
		return movieRepository.findAllByCastNameContaining(cast);
	}
	
	public List<Movie> GetMoviesByDirector(String director,int pageNumber){
		Pageable page=PageRequest.of(pageNumber-1, 10);
		return movieRepository.findAllByDirectorContaining(director);
	}
	
	public List<Movie> GetMoviesByHighestRating(int pageNumber){
		Pageable page=PageRequest.of(pageNumber-1, 10,Sort.by("rating").descending());
		return movieRepository.findAll(page).getContent();
	}
	
	public List<Movie> GetLatestMovies(int pageNumber){
		Pageable page=PageRequest.of(pageNumber-1, 10,Sort.by("releaseYear").descending());
		return movieRepository.findAll(page).getContent();
	}
	
	public Movie addMovie(Movie movie) {
		return movieRepository.save(movie);
	}
	
	public Movie updateMovie(Movie movie) {
		return movieRepository.save(movie);
	}
	
	public void deleteMovie(Long id) {
		movieRepository.deleteById(id);
	}
}
