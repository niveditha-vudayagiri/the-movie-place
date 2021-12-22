import { RoleEnum } from './../model/role';
import { Router } from '@angular/router';
import { AuthenticationService } from '../model/service/authentication.service';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, Injectable } from '@angular/core';
import { User } from '../model/user'; 
import { Role } from '../model/role';
import { Validators } from '@angular/forms';
import { Profile } from '../model/profile';

@Component({
  selector: 'navbar-root',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  user: User;
  SignUpForm: FormGroup;

  constructor(
     private authenticationService: AuthenticationService,
     private router: Router,
     private fb: FormBuilder
     ){ 
       this.authenticationService.loggedInUser.subscribe(x=>this.user = x);

       this.SignUpForm=this.fb.group({
        id : [' '],
        username: ['',[
          Validators.required,
          Validators.maxLength(50)
        ]],
        password: ['',[
          Validators.required,
          Validators.maxLength(50)
        ]],
        profile: this.fb.group({
          firstName : ['',[
            Validators.required,
            Validators.maxLength(50)
          ]],
          lastName: ['',[
            Validators.required,
            Validators.maxLength(50)
          ]],
          email: ['',[
            Validators.required,
            Validators.maxLength(50)
          ]],
          profilePicture:['',[
            Validators.required,
            Validators.maxLength(50)
          ]]
        })
      });
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

  onSignUp():void{
    document.getElementById('sign-up-form').click();

    this.authenticationService.register(this.SignUpForm.value).subscribe({
      next: (response: User) => {
        console.log(response);
        this.router.navigate(["/home"]);
      },
      error: (error: string) => 

        console.log('Cannot sign up'+error)
      
    })
    this.SignUpForm.reset();
  }

  logout(){
    this.authenticationService.logout();
  }

}
