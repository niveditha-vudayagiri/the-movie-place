import { ActorService } from './../model/service/actor.service';
import { MovieService } from '../model/service/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie  } from '../model/movie';
import { Actor } from '../model/actor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movieDetails-root',
  templateUrl: './movieDetails.component.html',
  styleUrls: ['./movieDetails.component.css']
})
export class MovieDetailsComponent implements OnInit{

  public movie : Movie;
  public movieId: number;
  public cast: Set<Actor>;
  public castArray: Actor[];

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params=>{
        this.movieId=parseInt(params.get('movieId'));
    })

    this.getMovieById(this.movieId);

  }

  constructor(private movieService: MovieService,
    private actorService:ActorService,
    private activatedRoute: ActivatedRoute){
      this.cast=new Set<Actor>();
      this.castArray=[];
  }

  addActorToCast(actor:Actor){
    this.castArray.push(actor);
    this.cast=new Set<Actor>(this.castArray);
  }

  getMovieById(id:number):void{
      this.movieService.getMovie(id).subscribe({
          next: 
            (response: Movie)=> {
            this.movie=response;
            this.cast = response.cast;

            this.cast.forEach((actor:any)=>{
              if(typeof actor == "number"){
               this.getActorById(actor);
              }
              else
                this.castArray.push(actor);
            }
            );
          }
          ,
          error:() => console.error("Can't fetch movies!")
      })

  }

  getActorById(id:number):void{
    this.actorService.getActor(id).subscribe({
      next:
        (response:Actor)=>{
          this.addActorToCast(response);
        },
        error:()=> {
          console.error("Could not fetch the cast for the movie!")}
    })
  }
}

