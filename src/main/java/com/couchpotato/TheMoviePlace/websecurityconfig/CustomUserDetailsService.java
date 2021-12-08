package com.couchpotato.TheMoviePlace.websecurityconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.couchpotato.TheMoviePlace.model.User;
import com.couchpotato.TheMoviePlace.repo.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		CustomUserDetails userDetails=null;
		if(user == null) {
			throw new UsernameNotFoundException("User not found!");
		}
		else {
			userDetails=new CustomUserDetails(user);
		}
		return new CustomUserDetails(user);
	}

}
