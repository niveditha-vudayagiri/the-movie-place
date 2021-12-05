package com.couchpotato.TheMoviePlace.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.couchpotato.TheMoviePlace.exception.NoActorFoundException;
import com.couchpotato.TheMoviePlace.model.Actor;
import com.couchpotato.TheMoviePlace.repo.ActorRepository;

@Service
public class ActorService {

	private final ActorRepository actorRepository;
	
	@Autowired
	public ActorService(ActorRepository actorRepository) {
		this.actorRepository=actorRepository;
	}
	
	public List<Actor> GetAllActors(){
		return actorRepository.findAll();
	}
	
	public Actor GetActorById(Long id) {
		return actorRepository.findById(id).orElseThrow(() -> new NoActorFoundException("No actor found for the given id "+id));
	}
	
	public List<Actor> GetActorsByName(String name) {
		return actorRepository.findAllByName(name);
	}
	
	public Actor addActor(Actor actor) {
		return actorRepository.save(actor);
	}
	
	public Actor editActor(Actor actor) {
		return actorRepository.save(actor);
	}
	
	public void deleteActor(Long id) {
		actorRepository.deleteById(id);
	}
}
