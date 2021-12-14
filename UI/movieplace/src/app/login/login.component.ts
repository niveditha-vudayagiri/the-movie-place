import { User } from './../model/user';
import { AuthenticationService } from '../model/service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { first } from 'rxjs';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup= new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router:Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { 
      if(this.authenticationService.userValue){
        this.router.navigate(['/']);
      }
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
      password: ['',Validators.required]
    });
  }

  //Getter for easy access to form fields
  get f():{[key: string] :AbstractControl}{
      return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted=true;

    if(this.loginForm.invalid){
      return;
    }

    this.loading=true;
    this.authenticationService.login(this.f['username'].value,this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () =>{
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error =>{
          this.error=error;
          this.loading=false;
        }
      })
  }
  /*doLogin(){
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
  }*/
}
