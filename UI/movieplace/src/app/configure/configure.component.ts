import { ActorService } from './../model/service/actor.service';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../model/service/movie.service';

import { Actor } from '../model/actor';
import { Movie } from '../model/movie';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {

  public actors: Actor[];
  public movies: Movie[];

  public editActor: Actor;
  public deleteActor: Actor;

  constructor(private actorService: ActorService,
              private movieService: MovieService ) { }

  ngOnInit(): void {
    this.getAllMovies();
    this.getAllActors();
  }
  
  getAllMovies():void{
    this.movieService.getAllMovies(1).subscribe({
      next: (response: Movie[])=>{
        this.movies=response;
        console.log(this.movies.length);
      },
      error: () => console.error("Can't fetch movies!")
    }
    )
  }

  getAllActors():void{
    this.actorService.getAllActors().subscribe({
      next: (response: Actor[])=>{
        this.actors=response;
      },
      error: () => console.error("Can't fetch actors!")
    }
    )
  }

  public onAddActor(addActorForm: NgForm):void{
    document.getElementById('add-actor-form').click();
  
    this.actorService.addActor(addActorForm.value).subscribe({
     next: (response:Actor)=>{
        console.log(response);
        this.getAllActors();
      },
      error:
       ()=> console.log("Error! Cannot add Actor!")
    
    }
        
    )
  
    addActorForm.reset();
  }

  public onEditActor(actor: Actor):void{
  
    this.actorService.editActor(actor).subscribe(
      (response:Actor)=>{
        console.log(response);
        this.getAllActors();
      }
    )
  
  }

  public onDeleteActor(actorId: number):void{
  
    this.actorService.deleteActor(actorId).subscribe(
      ()=> { this.getAllActors();  })
  }
  
  public onOpenModal(actor: Actor,mode: string):void {
    const container=document.getElementById('main-container');

    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode == 'add'){
      button.setAttribute('data-target','#addActorModal');
    }
    else if(mode == 'edit'){
      this.editActor=actor;
      button.setAttribute('data-target','#editActorModal');
    }
    else if(mode == 'delete'){
      this.deleteActor=actor;
      button.setAttribute('data-target','#deleteActorModal');
    }

    container?.appendChild(button);
    button.click();
  }

}


