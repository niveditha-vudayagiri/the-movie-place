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
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params=>{
        this.movieId=parseInt(params.get('movieId'));
    })

    this.getMovieById(this.movieId);
  }

  constructor(private movieService: MovieService,
    private actorService:ActorService,
    private activatedRoute: ActivatedRoute){
        
  }

  getMovieById(id:number):void{
      this.movieService.getMovie(id).subscribe({
          next: 
            (response: Movie)=> {
            this.movie=response;
            this.cast = response.cast;
            console.log(this.cast);
          }
          ,
          error:() => console.error("Can't fetch movies!")
      })
  }
}

