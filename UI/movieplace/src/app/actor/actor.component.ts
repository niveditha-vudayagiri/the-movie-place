import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Actor } from '../model/actor';
import { Movie } from '../model/movie';
import { ActivatedRoute } from '@angular/router';
import { ActorService } from '../model/service/actor.service';
import { MovieService } from '../model/service/movie.service';

@Component({
  selector: 'actor-root',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit{

  public actor : Actor;
  public actorId: number;
  public moviesOfActor: Movie[];
  public moviesArray: Movie[];
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params=>{
        this.actorId=parseInt(params.get('actorId'));
    })

    this.getActorById(this.actorId);
    
  }

  constructor(private actorService: ActorService,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService){
        this.moviesOfActor=[];
        this.moviesArray=[];
  }

  addToMovies(movie:Movie){
    this.moviesArray.push(movie);
  }

  getActorById(id:number):void{
      this.actorService.getActor(id).subscribe({
          next: 
            (response: Actor)=> {
            this.actor=response;
            this.moviesOfActor=response.movies;
            this.moviesOfActor.forEach((movie:any)=>{
              if(typeof movie == "number"){
                this.getMovieById(movie);
               }
               else
               this.moviesArray.push(movie);
            })
          }
          ,
          error:() => console.error("Can't fetch actor!")
      })
  }

  getMovieById(id:number):void{
    this.movieService.getMovie(id).subscribe({
        next: 
          (response: Movie)=> {
            console.log(response);
              this.addToMovies(response);
        }
        ,
        error:() => console.error("Can't fetch movies!")
    })

}

}
