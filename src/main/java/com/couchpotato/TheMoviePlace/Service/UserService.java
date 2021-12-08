package com.couchpotato.TheMoviePlace.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.couchpotato.TheMoviePlace.model.User;
import com.couchpotato.TheMoviePlace.repo.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository=userRepository;
	}
	
	public User GetUserByUsername(String username) {
		return this.userRepository.findByUsername(username);
	}
	
	public User addUser(User user) {
		return this.userRepository.save(user);
	}
}
