import { CastExpr } from '@angular/compiler';
import { Actor } from './actor';
export class Movie{
    id : number;
    name : String;
    releaseYear: String;
    director: String;
    cast: Set<Actor>;
    watchPlatform: String;
    description: String;
    imageUrl: String;
    language: String;
    genre: String;
}