import { Router } from '@angular/router';
import { AccountService } from './../model/service/account.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
@Component({
  selector: 'navbar-root',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(private accountService: AccountService, private router: Router){ }

  onSignUp(signupForm: NgForm):void{
    document.getElementById('sign-up-form').click();

    this.accountService.register(signupForm.value).subscribe({
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
