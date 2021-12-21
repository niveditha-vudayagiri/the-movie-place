import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserReview } from '../userReview';

@Injectable({ providedIn: 'root' })
export class UserReviewService {

  private apiServerUrl=environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getUserReviewForMovie(movieId:number, userId:number):Observable<UserReview>{
        return this.http.get<UserReview>(`${this.apiServerUrl}/review/${movieId}/${userId}`);
    }  

    public getAllUserReviewsForMovie(movieId:number):Observable<UserReview[]>{
        return this.http.get<UserReview[]>(`${this.apiServerUrl}/review/${movieId}`);
    }

    public addUserReviewForMovie(userReview:UserReview):Observable<UserReview>{
        return this.http.post<UserReview>(`${this.apiServerUrl}/review/add`,userReview);
    }

    public updateUserReviewForMovie(userReview:UserReview):Observable<UserReview>{
        return this.http.put<UserReview>(`${this.apiServerUrl}/review/edit`,userReview);
    }

    public deleteUserReviewForMovie(id:number):Observable<UserReview>{
        return this.http.delete<UserReview>(`${this.apiServerUrl}/review/delete/${id}`);
    }
}