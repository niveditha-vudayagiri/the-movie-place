import { AccountService } from './../model/service/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  message: any;

  constructor(private accountService: AccountService,private router:Router) { }

  ngOnInit(): void {
  }

  doLogin(){
    this.accountService.login(this.username,this.password).subscribe({
      next: ( response: User)=>{
        //this.message=response;
        console.log(response);
        this.router.navigate(["/home"]);
      },
      error: () =>
      {
        console.error('Cannot login!');
      }
    })
  }
}
