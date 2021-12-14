import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
  export class AuthenticationService {
    private apiServerUrl=environment.apiBaseUrl;
    private userSubject: BehaviorSubject<User>;
    public loggedInUser: Observable<User>;

    constructor(private http:HttpClient,private router:Router){
      this.userSubject =new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.loggedInUser = this.userSubject.asObservable();
     }

     public get userValue():User{
       return this.userSubject.value;
     }

    public login(username: string, password:string):Observable<User>{
        const body = JSON.stringify({username: username,password: password});

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Basic ' + btoa(username+":"+password)
          })
        };
        return this.http.get<User>(`${this.apiServerUrl}/auth/${username}`,httpOptions)
        .pipe(map(user => {
          localStorage.setItem('user',JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        }));

        console.log('User logged in');
    }

    logout(){
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/login']);
    }

    public register(user: User):Observable<User>{
        return this.http.post<User>(`${this.apiServerUrl}/auth/register`,user);
    }
  }