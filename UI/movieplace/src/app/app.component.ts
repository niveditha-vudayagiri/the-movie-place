import { Component } from '@angular/core';
import { Role, RoleEnum } from './model/role';
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
    let roles=this.user.roles;
    let isAdminRoleExist=false;
    
    roles.forEach(role=>{
      if(role.role==RoleEnum.Admin)  isAdminRoleExist=true;
    })

    return this.user && isAdminRoleExist;
  }

  logout(){
    this.authenticationService.logout();
  }
}
