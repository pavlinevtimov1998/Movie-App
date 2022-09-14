import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MovieService } from '../../movie.service';
import { mergeMap, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from 'src/app/core/interfaces.ts/Movie-Interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  movie!: IMovie;
  isLoading = false;
  subscription$ = new Subscription();

  editMovieForm!: FormGroup;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription$.add(
      this.activatedRoute.params
        .pipe(
          mergeMap((params) => {
            const movieId = params['movieId'];
            return this.movieService.getOne(movieId);
          })
        )
        .subscribe({
          next: (response) => {
            this.movie = response.movie;
            this.editMovieForm = this.formBuilder.group({
              name: new FormControl(this.movie.name, [
                Validators.required,
                Validators.minLength(5),
                Validators.pattern(/[A-Za-z ]+/),
              ]),
              imageUrl: new FormControl(this.movie.imageUrl, [
                Validators.required,
                Validators.pattern('((https://|http://).+(.jpg|.png))'),
              ]),
              genre: new FormControl(this.movie.genre, [
                Validators.required,
                Validators.pattern(/[A-Za-z ]+/),
              ]),
              description: new FormControl(this.movie.description, [
                Validators.required,
                Validators.minLength(10),
              ]),
            });
            this.isLoading = false;
          },
          error: (err) => {
            console.log(err);
          },
        })
    );
  }

  editMovieHandler() {
    if (this.editMovieForm.invalid) {
      return;
    }

    this.isLoading = true;

    const { name, imageUrl, genre, description } = this.editMovieForm.value;

    const body = {
      name,
      imageUrl,
      genre,
      description,
    };

    this.movieService.editMovie(body, this.movie._id as string).subscribe({
      next: (response) => {
        this.router.navigate(['/movies/details/' + response.movie._id]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
