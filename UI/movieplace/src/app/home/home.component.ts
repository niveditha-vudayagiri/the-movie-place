import { MovieService } from '../model/service/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie';
import { of } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public movies: Movie[];

  constructor(private movieservice:MovieService, private router: Router){

  }

  ngOnInit(){
    this.getAllMovies();
  }

  getAllMovies():void{
    this.movieservice.getAllMovies(1).subscribe({
      next: (response: Movie[])=>{
        this.movies=response;
      },
      error: () => console.error("Can't fetch movies!")
    }
    )
  }

}
