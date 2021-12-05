package com.couchpotato.TheMoviePlace.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.couchpotato.TheMoviePlace.model.Actor;

public interface ActorRepository extends JpaRepository<Actor,Long>{

	public List<Actor> findAllByName(String name);
}
