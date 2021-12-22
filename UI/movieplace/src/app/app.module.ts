import { CustomValidationService } from './helpers/customValidation.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './model/service/authentication.service';
import { MovieDetailsComponent } from './movieDetails/movieDetails.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Component,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActorComponent } from './actor/actor.component';
import { RouterModule, Routes} from '@angular/router';
import { ConfigureComponent } from './configure/configure.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { RatingComponent } from './rating/rating.component';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MovieDetailsComponent,
    ActorComponent,
    ConfigureComponent,
    LoginComponent,
    AdminComponent,
    RatingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule
  ],
  schemas:[NO_ERRORS_SCHEMA], 
  exports:
  [
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    JwtInterceptor,
    CustomValidationService
  ],
  bootstrap: [ AppComponent],

})
export class AppModule { 
  
}
