import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../user';
@Injectable({
    providedIn: 'root'
  })

  export class AccountService {
    private apiServerUrl=environment.apiBaseUrl;

    constructor(private http:HttpClient){ }

    public login(username: string, password:string):Observable<any>{
        const body = JSON.stringify({username: username,password: password});

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Basic ' + btoa(username+":"+password)
          })
        };

        return this.http.get(`${this.apiServerUrl}/auth/${username}`,httpOptions);
    }

    public register(user: User):Observable<User>{
        return this.http.post<User>(`${this.apiServerUrl}/auth/register`,user);
    }
  }