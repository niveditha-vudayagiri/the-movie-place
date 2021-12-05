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

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params=>{
        this.actorId=parseInt(params.get('actorId'));
    })

    this.getActor(this.actorId);
    
  }

  constructor(private actorService: ActorService,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService){
        
  }

  getActor(id:number):void{
      this.actorService.getActor(id).subscribe({
          next: 
            (response: Actor)=> {
            this.actor=response;
            console.log(this.actor);
            this.getMoviesOfActor(this.actor);
          }
          ,
          error:() => console.error("Can't fetch actor!")
      })
  }

  getMoviesOfActor(actor: Actor):void{
      this.movieService.searchMovie(actor?.name.toString(),1).subscribe({
        next: 
          (response:Movie[])=>{
            this.moviesOfActor=response;
            console.log(this.moviesOfActor);
          },
          error:() => console.error("Can't fetch movies!")
      })
  }
}
