import { CustomValidationService } from './../helpers/customValidation.service';
import { Actor } from './../model/actor';
import { ActorService } from './../model/service/actor.service';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../model/service/movie.service';
import { FormGroup, FormControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Movie } from '../model/movie';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {

  public editable: any[];
  public showMovies: boolean;
  public showActors: boolean; 
  public listOfActors:Actor[]=[];
  public selectedCast = new Set<Actor>()
  public dropdownSettings:IDropdownSettings={};
  public platforms: string[]=[];
   ActorForm: FormGroup;
   MovieForm: FormGroup;
   get af(){
     return this.ActorForm.controls;
   }

   get mf(){
     return this.MovieForm.controls;
   }

   get cast(){
     return this.MovieForm.get('cast');
   }

   get movieName() {
     return this.MovieForm.get('name');
   }

   get movieReleaseYear(){
     return this.MovieForm.get('releaseYear');
   }

   get movieRating(){
     return this.MovieForm.get('rating');
   }

   get movieDirector(){
     return this.MovieForm.get('director');
   }

   get movieWatchPlatform(){
     return this.MovieForm.get('watchPlatform');
   }
   onChangeActor(e:any){
     let actor = this.MovieForm.get('cast').value[0];
     console.log(actor);
     //Get Cash obj and push
     this.selectedCast.add(actor);

     console.log(this.selectedCast);
   }

  constructor(private actorService: ActorService,
              private movieService: MovieService ,
              private fb: FormBuilder,
              private customValidator:CustomValidationService) { 

    let numbersRegEx = '^[0-9].+$';
    let decimalRegEx='[0-9]+\.?[0-9]+'

    this.platforms = ['Hulu','Amazon Prime','Netflix','HBO','Hotstar','Disney+','Aha','Youtube'];
    this.ActorForm=this.fb.group({  
                  id: [''],
                  name: ['',Validators.required],
                  age: ['',[Validators.required,Validators.pattern(numbersRegEx)]],
                  imageUrl: ['',Validators.required],
                  movies: ['']
                });
              
                 
    this.MovieForm= this.fb.group({
                  id : [' '],
                  name : ['',[
                    Validators.required,
                    Validators.maxLength(50)
                  ]],
                  releaseYear: ['',[
                    Validators.required,
                    Validators.pattern(numbersRegEx),
                    Validators.min(1800),
                    Validators.max(2022)
                  ]],
                  rating: ['',[
                    Validators.required,
                    Validators.pattern(decimalRegEx),
                    Validators.min(0.1),
                    Validators.max(9.9)
                  ]],
                  director: ['',[
                    Validators.required,
                    Validators.maxLength(30)
                  ]],
                  cast: ['',Validators.required],
                  review: [''],
                  watchPlatform: ['',Validators.required],
                  description: ['',Validators.required],
                  imageUrl: ['',Validators.required],
                  language: ['',[Validators.required]],
                  genre: ['',Validators.required]
                 })
              }

  ngOnInit(): void {
    this.getAllMovies();
    this.showActors = false;
    this.showMovies = true;
    
    this.getListOfActors();
  }
  
  onClickMovie():void{
    this.getAllMovies();
    this.showMovies = true;
    this.showActors=false;
  }

  onClickActor():void{
    this.getAllActors();
    this.showActors = true;
    this.showMovies=false;
  }

  getAllMovies():void{
    this.movieService.getAllMovies(1).subscribe({
      next: (response: Movie[])=>{
        this.editable=response;
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

  getListOfActors():void{
    this.actorService.getAllActors().subscribe({
      next: (response: Actor[])=>{
        this.listOfActors=response;
      },
      error: () => console.log("Can't fetch actors!")
    }
    )
  }

  public onAddActor():void{
    document.getElementById('add-actor-form').click();
  
    this.actorService.addActor(this.ActorForm.value).subscribe({
     next: (response:Actor)=>{
        console.log(response);
        this.getAllActors();
      },
      error:
       ()=> console.log("Error! Cannot add Actor!")
    
    }        
    )
    this.ActorForm.reset();
  }

  public onAddMovie():void{
    let actorsArray: Actor[] =[];

    actorsArray=Array.from(this.selectedCast);
    document.getElementById('add-movie-form').click();

    let totalErrors=0;
    //Check for form validation errors
    Object.keys(this.MovieForm.controls).forEach(key=> {
      const controlErrors: ValidationErrors = this.MovieForm.get(key).errors;
      if(controlErrors!=null){
          totalErrors++;
      }
    })

    console.log( 'Number of errors:',totalErrors);

    if(totalErrors==0){
    this.MovieForm.patchValue({
      cast: actorsArray
    });

    this.movieService.addMovie(this.MovieForm.value).subscribe({
     next: (response:Movie)=>{
        console.log(response);
        this.getAllMovies();
      },
      error:
       ()=> console.log("Error! Cannot add Movie!")
    }        
    )

    for(let actor of this.selectedCast)
    {
      console.log("add"+actor+"add");
    }
  
    

    this.MovieForm.reset();
    this.selectedCast.clear();
  }
  }

  public onEditActor():void{
  
    this.actorService.editActor(this.ActorForm.value).subscribe(
      (response:Actor)=>{
        console.log(response);
        this.getAllActors();
      }
    )
  
  }

  public onEditMovie():void{

    console.log(this.selectedCast);
    let actorsArray: Actor[] =[];

    actorsArray=Array.from(this.selectedCast);
    this.MovieForm.patchValue({
      cast: actorsArray
    });

    console.log(this.MovieForm.value);
    this.movieService.editMovie(this.MovieForm.value).subscribe(
      (response:Movie)=>{
        console.log(response);
        this.getAllMovies();
      }
    )
  
  }

  public onDeleteActor():void{
  
    this.actorService.deleteActor(this.ActorForm.get('id').value).subscribe(
      ()=> { this.getAllActors();  })
  }

  public onDeleteMovie():void{
  
    this.movieService.deleteMovie(this.MovieForm.get('id').value).subscribe(
      ()=> { this.getAllMovies();  })
  }
  
  public onOpenModal(obj:any ,mode: string):void {
    const container=document.getElementById('main-container');
    
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode == 'add'){
      if(this.showActors)
        button.setAttribute('data-target','#addActorModal');
      else{
        this.getListOfActors();
        button.setAttribute('data-target','#addMovieModal');
      }
    }
    else if(mode == 'edit'){
      if(this.showActors){
        this.ActorForm.patchValue({
          id: obj.id,
          name: obj.name,
          age: obj.age,
          imageUrl: obj.imageUrl
        });
        button.setAttribute('data-target','#editActorModal');
      }
      else{
        this.MovieForm.patchValue({
          id : obj.id,
          name : obj.name,
          releaseYear: obj.releaseYear,
          rating: obj.rating,
          director: obj.director,
          cast: obj.cast,
          review: obj.review,
          watchPlatform: obj.watchPlatform,
          description: obj.description,
          imageUrl: obj.imageUrl,
          language: obj.language,
          genre: obj.genre
        });
        
        
        button.setAttribute('data-target','#editMovieModal');
      }
        
      
    }
    else if(mode == 'delete'){
      if(this.showActors){
        this.ActorForm.patchValue({
          id: obj.id,
          name: obj.name,
          age: obj.age,
          imageUrl: obj.imageUrl
        });
          button.setAttribute('data-target','#deleteActorModal');
        }
      else{
        this.MovieForm.patchValue({
          id : obj.id,
          name : obj.name,
          releaseYear: obj.releaseYear,
          rating: obj.rating,
          director: obj.director,
          cast: obj.cast,
          review: obj.cast,
          watchPlatform: obj.watchPlatform,
          description: obj.watchPlatform,
          imageUrl: obj.imageUrl,
          language: obj.language,
          genre: obj.genre
        });
        button.setAttribute('data-target','#deleteMovieModal');
        console.log('Del movie');
      }
    }

    container?.appendChild(button);
    button.click();
  }

}


