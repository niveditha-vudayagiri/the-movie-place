import { RoleEnum } from './../model/role';
import { Router } from '@angular/router';
import { AuthenticationService } from '../model/service/authentication.service';
import { NgForm } from '@angular/forms';
import { Component, Inject, Injectable } from '@angular/core';
import { User } from '../model/user'; 
import { Role } from '../model/role';

@Component({
  selector: 'navbar-root',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  user: User;
  constructor(
     private authenticationService: AuthenticationService,
     private router: Router){ 
       this.authenticationService.loggedInUser.subscribe(x=>this.user = x);
     }

  get isAdmin(){
    if(this.user){
    let roles=this.user.roles;
    let isAdminRoleExist=false;
    
    roles.forEach((x:Role)=>{
      if(x.role==RoleEnum.Admin) {
        isAdminRoleExist=true;
      } 
    })
    return this.user && isAdminRoleExist;
  }
  else 
    return false;
  }

  onSignUp(signupForm: NgForm):void{
    document.getElementById('sign-up-form').click();

    this.authenticationService.register(signupForm.value).subscribe({
      next: (response: User) => {
        console.log(response);
        this.router.navigate(["/home"]);
      },
      error: (error: string) => 

        console.log('Cannot sign up'+error)
      
    })
    signupForm.reset();
  }

  logout(){
    this.authenticationService.logout();
  }

}
