import { CustomValidationService } from './../helpers/customValidation.service';
import { Actor } from './../model/actor';
import { ActorService } from './../model/service/actor.service';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../model/service/movie.service';
import { FormGroup, FormControl, FormBuilder, ValidationErrors, Validators, FormArray } from '@angular/forms';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {

  public editable: any[];
  public movies:any[];
  public actors:any[];
  public platforms: string[]=[];
  public languages: string[]=[];

  public showMovies: boolean;
  public showActors: boolean; 
  public isAddMovieMode: boolean;
  public isAddActorMode: boolean;

  public selectedCast = new Set<Actor>();
  public selectedGenres : string[]=[];
  public allGenres:any[]=[];

   ActorForm: FormGroup;
   MovieForm: FormGroup;

   get af(){
     return this.ActorForm.controls;
   }

   get mf(){
     return this.MovieForm.controls;
   }

   onChangeActor(e:any){
     let actor = this.MovieForm.get('cast').value[0];
     this.selectedCast.add(actor);

     if(this.selectedCast.size==0)
      this.MovieForm.controls['cast'].setErrors({'required':true});
   }

   onChangeGenre(e:any){
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
    request.timeout =100000;
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

    this.movies=[];
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
                  director: ['',[
                    Validators.required,
                    Validators.maxLength(30)
                  ]],
                  cast: ['',Validators.required],
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
    
    this.getAllActors();
  }
  
  onClickMovie():void{
    this.getAllMovies();
    this.showMovies = true;
    this.showActors=false;
  }

  onClickActor():void{
    this.getAllActors();
    this.editable=this.actors;
    this.showActors = true;
    this.showMovies=false;
  }

  getAllMovies():void{
    this.movies=[];
    this.movieService.getAllMovies(1).subscribe({
      next: (response: Movie[])=>{
        response.forEach((movie:Movie)=>{
          if(typeof movie =="number"){
            this.getMovie(movie);
          }
          else
            this.movies.push(movie);
        })
        this.editable=this.movies;
      },
      error: () => console.error("Can't fetch movies!")
    }
    )
  }

  getMovie(id:number):void{
    this.movieService.getMovie(id).subscribe({
      next: (movieFromApi:Movie)=>{
        this.movies.push(movieFromApi);
      }
    })
  }

  getAllActors():void{
    this.actors=[];
    this.actorService.getAllActors().subscribe({
      next: (response: Actor[])=>{
        response.forEach((actor:Actor)=>{
          if(typeof actor =="number"){
            this.getActor(actor);
          }
          else
            this.actors.push(actor);
        })
      },
      error: () => console.error("Can't fetch actors!")
    }
    )
  }

  getActor(id:number):void{
    this.actorService.getActor(id).subscribe({
      next: (actorFromApi:Actor)=>{
        this.actors.push(actorFromApi);
      }
    })
  }

  public onAddActor():void{
    document.getElementById('add-actor-form').click();
  
    if(this.isAddActorMode){
    let actorToAdd:Actor = new Actor();
    actorToAdd.name=this.ActorForm.controls['name'].value;
    actorToAdd.age=this.ActorForm.controls['age'].value;
    actorToAdd.imageUrl=this.ActorForm.controls['imageUrl'].value;
    actorToAdd.movies=[];

    console.log(actorToAdd);
    this.actorService.addActor(actorToAdd).subscribe({
     next: (response:Actor)=>{
        this.getAllActors();
        this.editable=this.actors;
      },
      error:
       ()=> console.log("Error! Cannot add Actor!")
    })
  }else{

    this.actorService.editActor(this.ActorForm.value).subscribe(
      (response:Actor)=>{
        console.log(response);
        this.getAllActors();
        this.editable=this.actors;
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
     let movieToAdd:Movie =new Movie();
      movieToAdd.name=this.MovieForm.controls['name'].value;
      movieToAdd.releaseYear=this.MovieForm.controls['releaseYear'].value;
      movieToAdd.cast=this.MovieForm.controls['cast'].value;
      movieToAdd.description=this.MovieForm.controls['description'].value;
      movieToAdd.director=this.MovieForm.controls['director'].value;
      movieToAdd.genre=this.MovieForm.controls['genre'].value;
      movieToAdd.imageUrl=this.MovieForm.controls['imageUrl'].value;
      movieToAdd.language=this.MovieForm.controls['language'].value;
      movieToAdd.watchPlatform=this.MovieForm.controls['watchPlatform'].value;

          this.movieService.addMovie(movieToAdd).subscribe({
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
      ()=> { this.getAllActors();
        this.editable=this.actors;
        })
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
        this.isAddActorMode=true;
        button.setAttribute('data-target','#ActorModal');
      }
      else{
        this.isAddMovieMode=true;
        this.getAllActors();
        button.setAttribute('data-target','#MovieModal');
      }
    }
    else if(mode == 'edit'){
      if(this.showActors){
        this.isAddActorMode=false;
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
          director: obj.director,
          cast: obj.cast,
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
          director: obj.director,
          cast: obj.cast,
          watchPlatform: obj.watchPlatform,
          description: obj.watchPlatform,
          imageUrl: obj.imageUrl,
          language: obj.language,
          genre: obj.genre
        });
        button.setAttribute('data-target','#deleteMovieModal');
      }
    }

    container?.appendChild(button);
    button.click();
  }

}


