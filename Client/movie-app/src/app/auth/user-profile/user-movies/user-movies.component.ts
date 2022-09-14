import { Component, OnDestroy, OnInit } from '@angular/core';
import { mergeMap, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

import { IMovie } from 'src/app/core/interfaces.ts/Movie-Interface';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-user-movies',
  templateUrl: './user-movies.component.html',
  styleUrls: ['./user-movies.component.css'],
})
export class UserMoviesComponent implements OnInit, OnDestroy {
  movies!: IMovie[];
  subsctibtion$ = new Subscription();

  isLoading = false;

  constructor(
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subsctibtion$.add(
      this.authService.currentUser$
        .pipe(
          mergeMap((user) => {
            return this.movieService.getUserMovies(user._id as string);
          })
        )
        .subscribe({
          next: (movies) => {
            this.movies = movies;
            this.isLoading = false;
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subsctibtion$.unsubscribe();
  }
}
