import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/core/interfaces.ts/Movie-Interface';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  isLoading = false;

  createMovieForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createMovieForm = this.formBuilder.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/[A-Za-z ]+/),
      ]),
      imageUrl: new FormControl(null, [
        Validators.required,
        Validators.pattern('((https://|http://).+(.jpg|.png))'),
      ]),
      genre: new FormControl(null, [
        Validators.required,
        Validators.pattern(/[A-Za-z ]+/),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  createMovieHandler() {
    if (this.createMovieForm.invalid) {
      return;
    }
    this.isLoading = true;

    const { name, imageUrl, genre, description } = this.createMovieForm
      .value as IMovie;

    const body = {
      name,
      imageUrl,
      genre,
      description,
    };

    this.movieService.createMovie(body).subscribe({
      next: (response) => {
        this.router.navigate(['/movies/details/' + response.movie._id]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
