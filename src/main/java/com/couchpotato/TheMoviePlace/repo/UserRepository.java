package com.couchpotato.TheMoviePlace.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.couchpotato.TheMoviePlace.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

	User findByUsername(String username);
}
