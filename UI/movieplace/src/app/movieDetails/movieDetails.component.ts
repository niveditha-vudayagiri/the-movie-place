import { AuthenticationService } from '../model/service/authentication.service';
import { UserService } from './../model/service/user.service';
import { UserReview } from './../model/userReview';
import { UserReviewService } from '../model/service/userRating.service';
import { ActorService } from './../model/service/actor.service';
import { MovieService } from '../model/service/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie  } from '../model/movie';
import { Actor } from '../model/actor';
import { User } from '../model/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movieDetails-root',
  templateUrl: './movieDetails.component.html',
  styleUrls: ['./movieDetails.component.css']
})


export class MovieDetailsComponent implements OnInit{

  public movie : Movie;
  public movieId: number;
  public user: User;
  public cast: Set<Actor>;
  public castArray: Actor[];
  public userReviews: UserReview[];
  public currentUserReview:UserReview;
  public ratingClicked: number;
  public itemIdRatingClicked: string;

  public addReviewMode:boolean;
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params=>{
        this.movieId=parseInt(params.get('movieId'));
    })

    this.getMovieById(this.movieId);
    
  }

  constructor(private movieService: MovieService,
    private userReviewService: UserReviewService,
    private userService:UserService,
    private actorService:ActorService,
    private activatedRoute: ActivatedRoute,
    private authenticationService:AuthenticationService){
      this.cast=new Set<Actor>();
      this.castArray=[];
      this.userReviews=[];
      this.authenticationService.loggedInUser.subscribe((x:User)=>{
        this.user = x;
      });
      this.addReviewMode=false;
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
            });
            this.getCurrentUserReview();
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

  getAllUserReviews():void{
      this.userReviewService.getAllUserReviewsForMovie(this.movieId).subscribe({
        next: 
        (response:UserReview[])=>{
          this.userReviews=response;
          this.userReviews.forEach((review,index)=>{

            if(review.id==this.currentUserReview.id) {
             this.userReviews.splice(index,1);
            }
            
          });
          console.log(this.userReviews);
        },
        error: ()=> {console.error('Cannot get user reviews for the movie')}
      })
  }

  getCurrentUserReview():void{
    this.userReviewService.getUserReviewForMovie(this.movieId,this.user.id).subscribe({
      next: 
      (response:UserReview)=>{
        this.currentUserReview=response;
        if(this.currentUserReview==null)
          {
            this.currentUserReview=new UserReview();
            this.currentUserReview.user=this.user;
            this.currentUserReview.movie=this.movie;
            
            this.addReviewMode=true;
          }
        this.getAllUserReviews();
      },
      error: ()=> {console.error('Cannot get user review for the movie')}
    })
  
}

  ratingComponentClick(clickObj: any): void {
    if (!!this.currentUserReview) {
      this.currentUserReview.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = this.currentUserReview.user.profile.firstName;
      
      this.userReviewService.updateUserReviewForMovie(this.currentUserReview).subscribe({
        next:(response:UserReview)=>{console.log(response);},
        error:()=>{console.error('Cannot update rating!')}
      })
    }

  }

  editReviewTitle(review:UserReview):void{
    document.getElementById("reviewTitle").hidden=true;
    document.getElementById("reviewTitleInput").hidden=false;
    document.getElementById("editReviewTitleButton").hidden=true;
    document.getElementById("updateReviewTitleButton").hidden=false;
    document.getElementById("discardReviewTitleButton").hidden=false;
  }

  updateReview(review:UserReview):void{
    if(this.addReviewMode == false){
      this.userReviewService.updateUserReviewForMovie(review).subscribe({
        next:(response:UserReview)=>{console.log(response);},
        error:()=>{console.error('Cannot update review!')}
      })
      }else{
        this.userReviewService.addUserReviewForMovie(this.currentUserReview).subscribe({
          next:(response:UserReview)=>{console.log(response);},
          error:()=>{console.error('Cannot add review!')}
        })
        this.addReviewMode=false;
      }

    this.discardReviewTitle(review);
  }

  discardReviewTitle(review:UserReview):void{
    document.getElementById("reviewTitle").hidden=false;
    document.getElementById("reviewTitleInput").hidden=true;
    document.getElementById("editReviewTitleButton").hidden=false;
    document.getElementById("updateReviewTitleButton").hidden=true;
    document.getElementById("discardReviewTitleButton").hidden=true;
  }

  onReviewInputChange(updatedValue:string):void{
    this.currentUserReview.reviewTitle=updatedValue;
  }

  editReviewDesc(review:UserReview):void{
    document.getElementById("reviewDesc").hidden=true;
    document.getElementById("reviewDescInput").hidden=false;
    document.getElementById("editReviewDescButton").hidden=true;
    document.getElementById("updateReviewDescButton").hidden=false;
    document.getElementById("discardReviewDescButton").hidden=false;
  }

  discardReviewDesc(review:UserReview):void{
    document.getElementById("reviewDesc").hidden=false;
    document.getElementById("reviewDescInput").hidden=true;
    document.getElementById("editReviewDescButton").hidden=false;
    document.getElementById("updateReviewDescButton").hidden=true;
    document.getElementById("discardReviewDescButton").hidden=true;
  }

  onReviewDescInputChange(updatedValue:string):void{
    this.currentUserReview.reviewDescription=updatedValue;
  }

}

