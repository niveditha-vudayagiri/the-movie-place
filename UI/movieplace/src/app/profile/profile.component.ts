import { AuthenticationService } from './../model/service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  constructor(private authenticationService: AuthenticationService) { 
    this.authenticationService.loggedInUser.subscribe(x=> { this.user=x});
  }

  ngOnInit(): void {
  }

}
