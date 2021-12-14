import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movieDetails/movieDetails.component';
import { ActorComponent } from './actor/actor.component';
import { ConfigureComponent } from './configure/configure.component';
import { LoginComponent } from './login/login.component';


const routes: Routes= [
    {
        path:'home', 
        component: HomeComponent, data:{header:true}
    },
    {
        path:'movieDetails/:movieId', 
        component: MovieDetailsComponent, data:{header:true}
     },
    {
        path: 'actor/:actorId', 
        component: ActorComponent
    },
    { 
        path: 'configure', 
        component: ConfigureComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',   
        redirectTo: '/home',
         pathMatch: 'full' 
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }