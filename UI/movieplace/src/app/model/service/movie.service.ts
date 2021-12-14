import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../movie';
import { Observable } from 'rxjs';
import { Actor } from '../actor';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllMovies(pageNumber :number): Observable<Movie[]>{
      return this.http.get<Movie[]>(`${this.apiServerUrl}/movie/all/${pageNumber}`);
  }

  public getMovie(id: number): Observable<Movie>{
    return this.http.get<Movie>(`${this.apiServerUrl}/movie/${id}`)
  }

  public searchMovie(query: string,pageNumber: number):Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.apiServerUrl}/movie/search/${query}/${pageNumber}`);
  }

  public getTopMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.apiServerUrl}/movie/top`);
  }

  public getLatestMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.apiServerUrl}/movie/latest`);
  }

  public addMovie(movie: Movie):Observable<Movie>{
    return this.http.post<Movie>(`${this.apiServerUrl}/movie/add/`,movie);
  }

  public editMovie(movie: Movie):Observable<Movie>{
    return this.http.put<Movie>(`${this.apiServerUrl}/movie/edit/`,movie);
  }

  public deleteMovie(id: number):Observable<Movie>{
    return this.http.delete<Movie>(`${this.apiServerUrl}/movie/delete/${id}`);
  }
}
