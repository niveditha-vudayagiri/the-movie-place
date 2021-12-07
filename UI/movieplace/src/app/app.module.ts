import { MovieDetailsComponent } from './movieDetails/movieDetails.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActorComponent } from './actor/actor.component';
import { RouterModule, Routes} from '@angular/router';
import { ConfigureComponent } from './configure/configure.component'
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';

const routes: Routes= [
  {path:'home', component: HomeComponent, data:{header:true}},
  {path:'movieDetails/:movieId', component: MovieDetailsComponent, data:{header:true} },
  {path: 'actor/:actorId', component: ActorComponent},
  {path: 'configure', component: ConfigureComponent},
  {path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MovieDetailsComponent,
    ActorComponent,
    ConfigureComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports:
  [
    RouterModule
  ],
  providers: [],
  bootstrap: [ AppComponent],

})
export class AppModule { 
  
}
