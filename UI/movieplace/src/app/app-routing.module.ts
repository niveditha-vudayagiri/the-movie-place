import { AuthGuard } from './helpers/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movieDetails/movieDetails.component';
import { ActorComponent } from './actor/actor.component';
import { ConfigureComponent } from './configure/configure.component';
import { LoginComponent } from './login/login.component';
import { RoleEnum } from './model/role';

const routes: Routes= [
    {
        path:'home', 
        component: HomeComponent
    },
    {
        path:'movieDetails/:movieId', 
        component: MovieDetailsComponent,
        canActivate: [AuthGuard]
     },
    {
        path: 'actor/:actorId', 
        component: ActorComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'configure', 
        component: ConfigureComponent,
        canActivate:[AuthGuard],
        data: { roles: [RoleEnum.Admin]}
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