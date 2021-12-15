import { CustomValidationService } from './../helpers/customValidation.service';
import { Actor } from './../model/actor';
import { ActorService } from './../model/service/actor.service';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../model/service/movie.service';
import { FormGroup, FormControl, FormBuilder, ValidationErrors, Validators, FormArray } from '@angular/forms';
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
  public selectedCast = new Set<Actor>();
  public selectedGenres : string[]=[];
  public allGenres:any[]=[];
  public dropdownSettings:IDropdownSettings={};
  public platforms: string[]=[];
  public languages:string[]=[];
  public isAddMovieMode: boolean;
  public isAddActorMode: boolean;
   ActorForm: FormGroup;
   MovieForm: FormGroup;
   get af(){
     return this.ActorForm.controls;
   }

   get mf(){
     return this.MovieForm.controls;
   }

   get actorName(){
     return this.ActorForm.get('name');
   }

   get actorAge(){
     return this.ActorForm.get('age');
   }

   get actorImageUrl(){
     return this.ActorForm.get('imageUrl');
   }

   get movieCast(){
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

   get movieDescription(){
     return this.MovieForm.get('description');
   }

   get movieLanguage(){
     return this.MovieForm.get('language');
   }

   get movieGenre(){
     return this.MovieForm.get('genre');
   }

   get movieImageUrl(){
     return this.MovieForm.get('imageUrl');
   }

   get movieReview(){
     return this.MovieForm.get('review');
   }

   onChangeActor(e:any){
     let actor = this.MovieForm.get('cast').value[0];
     this.selectedCast.add(actor);

     if(this.selectedCast.size==0)
      this.MovieForm.controls['cast'].setErrors({'required':true});
   }

   onChangeGenre(e:any){

    const genreArray: FormArray =this.MovieForm.get('genre') as  FormArray;
      if(e.target.checked)
        this.selectedGenres.push(e.target.ngValue);
      else{
        const index = this.selectedGenres.findIndex(prop => prop === e.target.ngValue)
        this.selectedGenres.splice(index,1)
      }
      if(this.selectedGenres.length==0)
        this.MovieForm.controls['genre'].setErrors({'required':true});
   }

   onChangeMovieImageUrl(e:any){

    let imageUrlControl = this.MovieForm.controls['imageUrl'];
    var request = new XMLHttpRequest();
    request.open("GET", e.target.value, true);
    request.send();
    request.timeout =5000;
    request.onload = function() {
      if (request.status != 200) //if(statusText == OK)
      {
        imageUrlControl.setErrors({'invalid':true});
      } 
    }
 }

 onChangeActorImageUrl(e:any){

  let imageUrlControl = this.ActorForm.controls['imageUrl'];
  var request = new XMLHttpRequest();
  request.open("GET", e.target.value, true);
  request.send();
  request.timeout =100000;
  request.onload = function() {
    if (request.status != 200) //if(statusText == OK)
    {
      imageUrlControl.setErrors({'invalid':true});
    } 
  }
}


  constructor(private actorService: ActorService,
              private movieService: MovieService ,
              private fb: FormBuilder,
              private customValidator:CustomValidationService) { 

    let numbersRegEx = '^[0-9].+$';
    let decimalRegEx='[0-9]+\.?[0-9]+'

    this.platforms = ['Hulu','Amazon Prime','Netflix','HBO','Hotstar','Disney+','Aha','Youtube'];
    this.languages=["Afrikaans","Albanian","Amharic","Arabic","Aragonese","Armenian","Asturian","Azerbaijani","Basque","Belarusian","Bengali","Bosnian","Breton",
          "Bulgarian","Catalan","Central Kurdish","Chinese","Chinese (Hong Kong)","Chinese (Simplified)","Chinese (Traditional)","Corsican","Croatian","Czech","Danish",
          "Dutch","English","English (Australia)","English (Canada)","English (India)","English (New Zealand)","English (South Africa)","English (United Kingdom)","English (United States)",
          "Esperanto","Estonian","Faroese","Filipino","Finnish","French","French (Canada)","French (France)","French (Switzerland)","Galician","Georgian","German",
          "German (Austria)","German (Germany)","German (Liechtenstein)","German (Switzerland)","Greek","Guarani","Gujarati","Hausa","Hawaiian","Hebrew","Hindi","Hungarian","Icelandic",
          "Indonesian","Interlingua","Irish","Italian","Italian (Italy)","Italian (Switzerland)","Japanese","Kannada","Kazakh","Khmer","Korean","Kurdish","Kyrgyz",
          "Lao","Latin","Latvian","Lingala","Lithuanian","Macedonian","Malay","Malayalam","Maltese","Marathi","Mongolian","Nepali","Norwegian","Norwegian Bokmål","Norwegian Nynorsk","Occitan",
          "Oriya","Oromo","Pashto","Persian","Polish","Portuguese","Portuguese (Brazil)","Portuguese (Portugal)","Punjabi","Quechua","Romanian","Romanian (Moldova)","Romansh",
          "Russian","Scottish Gaelic","Serbian","Serbo","Shona","Sindhi","Sinhala","Slovak","Slovenian","Somali","Southern Sotho","Spanish","Spanish (Argentina)","Spanish (Latin America)","Spanish (Mexico)",
          "Spanish (Spain)","Spanish (United States)","Sundanese","Swahili","Swedish","Tajik","Tamil","Tatar","Telugu","Thai","Tigrinya","Tongan","Turkish","Turkmen","Twi",
          "Ukrainian","Urdu","Uyghur","Uzbek","Vietnamese","Walloon","Welsh","Western Frisian","Xhosa","Yiddish","Yoruba","Zulu"
      ];
      this.allGenres=[
        {label:'Action',selected:false},
        {label:'Adventure',selected:false},
        {label:'Animated',selected:false},
        {label:'Comedy',selected:false},
        {label:'Drama',selected:false},
        {label:'Fantasy',selected:false},
        {label:'Historical',selected:false},
        {label:'Horror',selected:false},
        {label:'Sci-fi',selected:false},
        {label:'Thriller',selected:false},
        {label:'Western',selected:false},
        {label:'International',selected:false},
      ];
    this.ActorForm=this.fb.group({  
                  id: [''],
                  name: ['',Validators.required],
                  age: ['',[Validators.required,
                    Validators.pattern(numbersRegEx),
                    Validators.min(0),
                    Validators.max(200)]],
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
                  language: ['',Validators.required],
                  genre: ['',Validators.required],
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
  
    if(this.isAddActorMode){
    this.actorService.addActor(this.ActorForm.value).subscribe({
     next: (response:Actor)=>{
        console.log(response);
        this.getAllActors();
      },
      error:
       ()=> console.log("Error! Cannot add Actor!")
    })
  }else{

    this.actorService.editActor(this.ActorForm.value).subscribe(
      (response:Actor)=>{
        console.log(response);
        this.getAllActors();
      })
  }
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

    if(totalErrors==0){
    this.MovieForm.patchValue({
      cast: actorsArray,
      genre: this.selectedGenres.toString()
    });
    if(this.isAddMovieMode){
          this.movieService.addMovie(this.MovieForm.value).subscribe({
          next: (response:Movie)=>{
              this.getAllMovies();
            },
            error:
            ()=> console.log("Error! Cannot add Movie!")
          })
        }
  else{
        this.movieService.editMovie(this.MovieForm.value).subscribe(
          (response:Movie)=>{
            this.getAllMovies();
          }
        )} 
  }
  this.MovieForm.reset();
  this.selectedCast.clear();
  this.selectedGenres= [];
  document.getElementById('closeMovieModal').click();
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
      if(this.showActors){
        button.setAttribute('data-target','#ActorModal');
      }
      else{
        this.isAddMovieMode=true;
        this.getListOfActors();
        button.setAttribute('data-target','#MovieModal');
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
        button.setAttribute('data-target','#ActorModal');
      }
      else{

        this.isAddMovieMode=false;
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
          language: obj.language
        });

        //Select Checkboxes 
        let genres:string;
        genres=obj.genre;
        genres.split(',').forEach(genre=>{
          console.log(genre);
          this.selectedGenres.push(genre);
          this.allGenres.forEach(actualGenre=>{
            if(genre===actualGenre.label)
              actualGenre.selected=true;
          });
        
        });

        button.setAttribute('data-target','#MovieModal');
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


