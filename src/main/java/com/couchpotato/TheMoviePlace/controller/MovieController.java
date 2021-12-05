package com.couchpotato.TheMoviePlace.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.couchpotato.TheMoviePlace.Service.MovieService;
import com.couchpotato.TheMoviePlace.model.Movie;

@RestController
@RequestMapping("/movie")
public class MovieController {

	private final MovieService movieService;
	
	@Autowired
	public MovieController(MovieService movieService) {
		this.movieService=movieService;
	}
	
	@GetMapping("/all/{pageNumber}")
	public ResponseEntity<List<Movie>> GetAllMovies(@PathVariable int pageNumber){
		List<Movie> _listOfMovies=movieService.GetAllMovies(pageNumber);
		return new ResponseEntity<>(_listOfMovies,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Movie> GetMovie(@PathVariable Long id) {
		Movie _movie=movieService.GetMovieById(id);
		return new ResponseEntity<>(_movie,HttpStatus.OK);
	}
	
	@GetMapping("/search/{query}/{pageNumber}")
	public ResponseEntity<List<Movie>> GetMoviesFromQuery(@PathVariable String query,@PathVariable int pageNumber){
		List<Movie> listOfMovies=new ArrayList<Movie>();
		
		listOfMovies.addAll(movieService.GetMoviesByName(query, pageNumber));
		listOfMovies.addAll(movieService.GetMoviesByCast(query, pageNumber));
		listOfMovies.addAll(movieService.GetMoviesByDirector(query, pageNumber));
		
		return new ResponseEntity<>(listOfMovies,HttpStatus.OK);
	}
	
	@GetMapping("/top")
	public ResponseEntity<List<Movie>> GetHighestRatedMovies(){
		List<Movie> _listOfMovies=movieService.GetMoviesByHighestRating(0);
		return new ResponseEntity<>(_listOfMovies,HttpStatus.OK);
	}
	
	@GetMapping("/latest")
	public ResponseEntity<List<Movie>> GetLatestMovies(){
		List<Movie> _listOfMovies=movieService.GetLatestMovies(0);
		return new ResponseEntity<>(_listOfMovies,HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
		Movie _movie = movieService.addMovie(movie);
		return new ResponseEntity<>(_movie,HttpStatus.OK);
	}
	
	@PutMapping("/edit")
	public ResponseEntity<Movie> editMovie(@RequestBody Movie movie) {
		Movie _movie=movieService.updateMovie(movie);
		return new ResponseEntity<>(_movie,HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Movie> deleteMovie(@PathVariable Long id) {
		movieService.deleteMovie(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
