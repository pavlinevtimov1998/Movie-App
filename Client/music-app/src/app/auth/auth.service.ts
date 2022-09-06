import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../core/interfaces.ts/User-interface';

@Injectable()
export class AuthService {
  currentUser: IUser | undefined;

  constructor(private http: HttpClient) {}

  login$(userData: IUser): Observable<{ status: string; user: IUser }> {
    return this.http.post<{ status: string; user: IUser }>(
      'http://localhost:3000/users/login',
      userData,
      {
        withCredentials: true,
      }
    );
  }

  register$(userData: IUser): Observable<{ status: string; user: IUser }> {
    return this.http.post<{ status: string; user: IUser }>(
      'http://localhost:3000/users/register',
      userData,
      { withCredentials: true }
    );
  }
}
