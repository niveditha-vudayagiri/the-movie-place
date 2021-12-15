import { UserService } from './../model/service/user.service';
import { User } from './../model/user';
import { MovieService } from '../model/service/movie.service';
import { Component, Inject, OnInit, Injectable } from '@angular/core';
import { Movie } from '../model/movie';
import { of } from 'rxjs';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../model/service/authentication.service';
@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class HomeComponent implements OnInit{
  public movies: Movie[];
  public movieArray: Movie[];
  loading = false;
  user :User;
  userFromApi: User;
  searchTerm: string;

  constructor(
    private movieservice:MovieService, 
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService){
        this.user=this.authenticationService.userValue;
  }

  ngOnInit(){
    this.loading=true;
    this.userService.getById(this.user.id).pipe(
      first()).subscribe(user=>{
        this.loading=false;
        this.userFromApi=user;
      })
  
    this.movieArray=[];
    this.getAllMovies();
  }

  addToMovies(movie:Movie){
    this.movieArray.push(movie);
  }

  getAllMovies():void{
    this.movieservice.getAllMovies(1).subscribe({
      next: (response: Movie[])=>{
        this.movies=response;
        
        this.movies.forEach((movie:Movie)=>{
          if(typeof movie =="number")
              this.getMovieById(movie);
          else
             this.movieArray.push(movie);
        })
      },
      error: () => console.error("Can't fetch movies!")
    }
    )

    this.movies=this.movieArray;
  }

  getMovieById(id:number):void{
    this.movieservice.getMovie(id).subscribe({
      next: (response:Movie)=>{
        this.addToMovies(response);
      },
      error: ()=> console.error("Cannot fetch movie!")
    })
  }

  searchMovie():void{
    if(this.searchTerm=='') return;
    
    this.movieservice.searchMovie(this.searchTerm,1).subscribe({
      next: (response: Movie[])=>{
        this.movies=response;
      },
      error: ()=>console.error("Can't fetch movies!")
    })
  }

}
