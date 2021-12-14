import { Movie } from "./movie";

export interface Actor{
    id: number;
    name: String;
    age: number;
    imageUrl :String;
    movies: Movie[];
}