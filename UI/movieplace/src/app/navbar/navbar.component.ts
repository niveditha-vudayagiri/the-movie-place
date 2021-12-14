import { Router } from '@angular/router';
import { AuthenticationService } from '../model/service/authentication.service';
import { NgForm } from '@angular/forms';
import { Component, Inject, Injectable } from '@angular/core';
import { User } from '../model/user'; 

@Component({
  selector: 'navbar-root',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  
  constructor(
     private authenticationService: AuthenticationService,
     private router: Router){ }

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

}
