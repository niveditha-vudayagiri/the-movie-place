package com.couchpotato.TheMoviePlace.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.couchpotato.TheMoviePlace.Service.ActorService;
import com.couchpotato.TheMoviePlace.Service.UserService;
import com.couchpotato.TheMoviePlace.model.Actor;
import com.couchpotato.TheMoviePlace.model.Role;
import com.couchpotato.TheMoviePlace.model.User;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private final UserService userService;
	
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	public AuthController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
		this.userService=userService;
		this.passwordEncoder=passwordEncoder;
	}

	@GetMapping("/{username}")
	public ResponseEntity<User> getUser(@PathVariable String username) {
		User user=this.userService.GetUserByUsername(username);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody User user) {
		String pass=user.getPassword();
		Set<Role> roles=new HashSet<Role>();
		Role role=new Role("USER");
		roles.add(role);
		
		String encryptedPwd=passwordEncoder.encode(pass);
		user.setRoles(roles);
		user.setPassword(encryptedPwd);
		
		User _user= this.userService.addUser(user);
		return new ResponseEntity<>(_user,HttpStatus.OK);
	}
}
