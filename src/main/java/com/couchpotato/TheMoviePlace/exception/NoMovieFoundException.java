package com.couchpotato.TheMoviePlace.exception;

public class NoMovieFoundException extends RuntimeException{

	public NoMovieFoundException(String message) {
		super(message);
	}
}
