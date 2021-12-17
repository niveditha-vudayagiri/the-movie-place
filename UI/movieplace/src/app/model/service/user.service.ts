import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiBaseUrl}/auth`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiBaseUrl}/auth/id/${id}`);
    }
}