package com.couchpotato.TheMoviePlace.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.couchpotato.TheMoviePlace.Service.ActorService;
import com.couchpotato.TheMoviePlace.model.Actor;

@RestController
@RequestMapping("/actor")
public class ActorController {

	private final ActorService actorService;
	
	@Autowired
	public ActorController(ActorService actorService) {
		this.actorService=actorService;
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Actor>> GetAllActors(){
		List<Actor> listOfActors=actorService.GetAllActors();
		return new ResponseEntity<>(listOfActors,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Actor> GetActorById(@PathVariable Long id) {
		Actor _actor=actorService.GetActorById(id);
		return new ResponseEntity<>(_actor,HttpStatus.OK);
	}
	
	@GetMapping("/search/{name}")
	public ResponseEntity<List<Actor>> GetActorsByName(@PathVariable String name) {
		List<Actor> listOfActors=actorService.GetActorsByName(name);
		return new ResponseEntity<>(listOfActors,HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<Actor> addActor(@RequestBody Actor actor) {
		Actor _actor=actorService.addActor(actor);
		return new ResponseEntity<>(_actor,HttpStatus.OK);
	}
	
	@PutMapping("/edit")
	public ResponseEntity<Actor> editActor(@RequestBody Actor actor) {
		Actor _actor=actorService.editActor(actor);
		return new ResponseEntity<>(_actor,HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Actor> deleteActor(@PathVariable Long id) {
		actorService.deleteActor(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
