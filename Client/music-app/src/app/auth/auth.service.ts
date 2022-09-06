import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../core/interfaces.ts/User-interface';

@Injectable()
export class AuthService {
  currentUser: IUser | undefined;

  constructor(private http: HttpClient) {}

  register$(userData: IUser): Observable<IUser> {
    return this.http.post<IUser>(
      'http://localhost:3000/users/register',
      userData,
      { withCredentials: true }
    );
  }
}
