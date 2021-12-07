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

  public editable: any[];

  public editActor: Actor;
  public deleteActor: Actor;
  public editMovie : Movie;
  public deleteMovie: Movie;

  constructor(private actorService: ActorService,
              private movieService: MovieService ) { }

  ngOnInit(): void {
    this.getAllActors();
  }
  
  onClickMovie():void{
    this.getAllMovies();
  }

  onClickActor():void{
    this.getAllActors();
  }

  getAllMovies():void{
    this.movieService.getAllMovies(1).subscribe({
      next: (response: Movie[])=>{
        this.editable=response;
        console.log(this.editable.length);
      },
      error: () => console.error("Can't fetch movies!")
    }
    )
  }

  getAllActors():void{
    this.actorService.getAllActors().subscribe({
      next: (response: Actor[])=>{
        this.editable=response;
      },
      error: () => console.log("Can't fetch actors!")
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

  public onAddMovie(addMovieForm: NgForm):void{
    document.getElementById('add-movie-form').click();
  
    this.movieService.addMovie(addMovieForm.value).subscribe({
     next: (response:Movie)=>{
        console.log(response);
        this.getAllMovies();
      },
      error:
       ()=> console.log("Error! Cannot add Actor!")
    
    }        
    )
    addMovieForm.reset();
  }

  public onEditActor(actor: Actor):void{
  
    this.actorService.editActor(actor).subscribe(
      (response:Actor)=>{
        console.log(response);
        this.getAllActors();
      }
    )
  
  }

  public onEditMovie(movie: Movie):void{
  
    this.movieService.editMovie(movie).subscribe(
      (response:Movie)=>{
        console.log(response);
        this.getAllMovies();
      }
    )
  
  }

  public onDeleteActor(actorId: number):void{
  
    this.actorService.deleteActor(actorId).subscribe(
      ()=> { this.getAllActors();  })
  }

  public onDeleteMovie(movieId: number):void{
  
    this.movieService.deleteMovie(movieId).subscribe(
      ()=> { this.getAllMovies();  })
  }
  
  public onOpenModal(obj: any,mode: string):void {
    const container=document.getElementById('main-container');

    type ObjType = typeof obj;
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode == 'add'){
      button.setAttribute('data-target','#addActorModal');
    }
    else if(mode == 'edit'){
      if(obj.constructor.name == "Actor"){
        this.editActor=obj;
      }
      else if(obj.constructor.name == "Movie"){
        this.editMovie=obj;
      }
        
      button.setAttribute('data-target','#editActorModal');
    }
    else if(mode == 'delete'){
      if(obj.constructor.name == "Actor")
          this.deleteActor=obj;
      else if(obj.constructor.name == "Movie")
          this.deleteMovie=obj;
      button.setAttribute('data-target','#deleteActorModal');
    }

    container?.appendChild(button);
    button.click();
  }

}


