import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subscription, combineLatest } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

import { IMovie } from 'src/app/core/interfaces.ts/Movie-Interface';
import { IUser } from 'src/app/core/interfaces.ts/User-interface';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  movie!: IMovie;
  subscription$ = new Subscription();
  isLoading = false;
  isLiked!: boolean;

  isLoggedIn$ = this.authService.isLoggedIn$;
  currentUser!: IUser;
  isOwner!: boolean;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription$.add(
      combineLatest([this.activatedRoute.params, this.authService.currentUser$])
        .pipe(
          mergeMap(([params, currentUser]) => {
            const movieId = params['movieId'];
            this.currentUser = currentUser;
            return this.movieService.getOne(movieId);
          })
        )
        .subscribe((movieData) => {
          this.isOwner = movieData.movie._ownerId == this.currentUser._id;
          this.isLiked = !!movieData.movie.likes?.find(
            (like) => like._ownerId == this.currentUser._id
          );
          this.movie = movieData.movie;

          this.isLoading = false;
        })
    );
  }

  deleteHandler() {
    this.isLoading = true;
    this.subscription$.add(
      this.activatedRoute.params
        .pipe(
          mergeMap((params) => {
            const movieId = params['movieId'];
            return this.movieService.deleteMovie(movieId);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/catalog']);
        })
    );
  }

  likeHandler(isLiked: boolean) {
    if (!isLiked) {
      this.subscription$.add(
        this.activatedRoute.params
          .pipe(
            mergeMap((params) => {
              const movieId = params['movieId'];
              return this.movieService.likeMovie({ movieId });
            })
          )

          .subscribe(() => {
            this.movie.likes?.push({
              _ownerId: this.currentUser._id,
              movieId: this.movie._id,
            });
            this.isLiked = !this.isLiked;
          })
      );
    } else {
      this.subscription$.add(
        this.activatedRoute.params
          .pipe(
            mergeMap((params) => {
              const movieId = params['movieId'];
              return this.movieService.revokeLike(movieId);
            })
          )

          .subscribe(() => {
            this.movie.likes = this.movie.likes?.filter(
              (like) => like._ownerId !== this.currentUser._id
            );
            this.isLiked = !this.isLiked;
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
