import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IMovie } from 'src/app/core/interfaces.ts/Movie-Interface';
import { MovieService } from '../../../movie.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  movies!: IMovie[];
  subscription!: Subscription;
  isLoading = false;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.movieService
      .getMovies()
      .subscribe((moviesData) => {
        this.movies = moviesData;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
