import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, tap, catchError, EMPTY } from 'rxjs';

import { IUser } from './core/interfaces.ts/User-interface';

@Injectable({
  providedIn: 'root'
})
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

  logout$() {
    return this.http.get('http://localhost:3000/users/logout', {
      withCredentials: true,
    });
  }

  getProfile(): Observable<{ status: string; user: IUser }> {
    return this.http.get<{ status: string; user: IUser }>(
      'http://localhost:3000/users/profile',
      { withCredentials: true }
    );
  }

  handleLogin(user: IUser) {
    this._currentUser.next(user);
  }

  handleLogout() {
    this._currentUser.next(this.guest);
  }

  authenticate(): Observable<{ status: string; user: IUser }> {
    return this.getProfile().pipe(
      tap((data) => {
        this.handleLogin(data.user);
      }),
      catchError((err) => {
        console.log(err);

        return EMPTY;
      })
    );
  }
}
