import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actor } from '../actor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllActors():Observable<Actor[]>{
      return this.http.get<Actor[]>(`${this.apiServerUrl}/actor/all`)
  }

  public getActor(id: number): Observable<Actor>{
    return this.http.get<Actor>(`${this.apiServerUrl}/actor/${id}`)
  }

  public addActor(actor: Actor):Observable<Actor>{
    return this.http.post<Actor>(`${this.apiServerUrl}/actor/add/`,actor);
  }

  public editActor(actor: Actor):Observable<Actor>{
    return this.http.put<Actor>(`${this.apiServerUrl}/actor/edit/`,actor);
  }

  public deleteActor(id: number):Observable<Actor>{
    return this.http.delete<Actor>(`${this.apiServerUrl}/actor/delete/${id}`);
  }
}
