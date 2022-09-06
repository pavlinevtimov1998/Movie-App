import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';

import { IUser } from './core/interfaces.ts/User-interface';

@Injectable()
export class AuthService {
  guest: IUser = {
    username: '',
  };

  private _currentUser = new BehaviorSubject<IUser>(this.guest);

  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map((user) => user.username.length > 0));

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

  handleLogin(user: IUser) {
    this._currentUser.next(user);
  }

  hendleLogout() {
    this._currentUser.next(this.guest);
  }
}
