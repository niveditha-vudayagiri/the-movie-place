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
  loading = false;
  user :User;
  userFromApi: User;


  constructor(
    private movieservice:MovieService, 
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService){
        this.user=this.authenticationService.userValue;
  }

  ngOnInit(){
    this.loading=true;

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
