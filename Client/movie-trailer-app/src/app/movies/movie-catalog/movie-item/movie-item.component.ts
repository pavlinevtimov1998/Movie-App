import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { combineLatest, mergeMap, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IMovie } from 'src/app/core/interfaces.ts/Movie-Interface';
import { MovieService } from '../../movie.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent implements OnInit, OnDestroy {
  @Input() movie!: IMovie;

  isLoggedIn$ = this.authService.isLoggedIn$;
  isOwner!: boolean;
  isLiked = false;

  subscription = new Subscription();

  constructor(
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.currentUser$.subscribe((user) => {
        if (user.username.length > 0) {
          this.isOwner = user._id == this.movie._ownerId;
        }

        this.isLiked = !!this.movie.likes?.find(
          (like) => like._ownerId == user._id
        );
      })
    );
  }

  likeHandler(movieId: string, isLiked: boolean) {
    if (!isLiked) {
      this.subscription.add(
        combineLatest([
          this.authService.currentUser$,
          this.movieService.likeMovie({ movieId }),
        ]).subscribe(([user, response]) => {
          this.isLiked = true;
          if (user._id) {
            this.movie.likes?.push({
              _ownerId: user._id,
              movieId: this.movie._id,
            });
          }
        })
      );
    } else {
      this.subscription.add(
        combineLatest([
          this.authService.currentUser$,
          this.movieService.revokeLike(movieId),
        ]).subscribe(([user, _]) => {
          this.isLiked = false;
          if (user._id) {
            this.movie.likes = this.movie.likes?.filter(
              (like) => like._ownerId !== user._id
            );

            // .push({
            //   _ownerId: user._id,
            //   movieId: this.movie._id,
            // });
          }
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
