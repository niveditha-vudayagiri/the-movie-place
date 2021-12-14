import { Component } from '@angular/core';
import { Role } from './model/role';
import { AuthenticationService } from './model/service/authentication.service';
import { User } from './model/user';
import { Injectable } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AppComponent {
  user: User;
  
  constructor(private authenticationService : AuthenticationService)
  {
    this.authenticationService.loggedInUser.subscribe(x=> this.user = x);
  }

  get isAdmin(){
    return this.user && this.user.role==Role.Admin;
  }

  logout(){
    this.authenticationService.logout();
  }
}
