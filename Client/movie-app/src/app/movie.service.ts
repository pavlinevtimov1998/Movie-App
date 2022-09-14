import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from './core/interfaces.ts/Movie-Interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>('http://localhost:3000/data/movies');
  }

  getOne(movieId: string): Observable<{ status: string; movie: IMovie }> {
    return this.http.get<{ status: string; movie: IMovie }>(
      'http://localhost:3000/data/movies/' + movieId
    );
  }

  getUserMovies(userId: string): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(
      'http://localhost:3000/data/movies?_ownerId=' + userId
    );
  }

  createMovie(body: IMovie): Observable<{ status: string; movie: IMovie }> {
    return this.http.post<{ status: string; movie: IMovie }>(
      'http://localhost:3000/data/movies',
      body,
      {
        withCredentials: true,
      }
    );
  }

  editMovie(
    body: IMovie,
    movieId: string
  ): Observable<{ status: string; movie: IMovie }> {
    return this.http.put<{ status: string; movie: IMovie }>(
      'http://localhost:3000/data/movies/' + movieId,
      body,
      {
        withCredentials: true,
      }
    );
  }

  likeMovie(body: {
    movieId: string;
  }): Observable<{ status: string; message: string }> {
    return this.http.post<{ status: string; message: string }>(
      'http://localhost:3000/likes',
      body,
      {
        withCredentials: true,
      }
    );
  }

  revokeLike(movieId: string) {
    return this.http.delete('http://localhost:3000/likes/revoke/' + movieId, {
      withCredentials: true,
    });
  }

  deleteMovie(movieId: string) {
    return this.http.delete('http://localhost:3000/data/movies/' + movieId, {
      withCredentials: true,
    });
  }
}
