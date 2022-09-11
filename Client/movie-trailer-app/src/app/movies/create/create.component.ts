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
  createmovieForm: FormGroup = this.formBuilder.group({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/[A-Za-z ]+/),
    ]),
    imageUrl: new FormControl(null, [
      Validators.required,
      Validators.pattern('((https://|http://).+(.jpg|.png))'),
    ]),
    price: new FormControl(null, [Validators.required]),
    releaseDate: new FormControl(null, [
      Validators.required,
      Validators.pattern(/[0-9\.\/]+/),
    ]),
    artist: new FormControl(null, [
      Validators.required,
      Validators.pattern(/[A-Za-z ]+/),
      Validators.minLength(5),
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

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createmovieHandler() {
    const { name, imageUrl, price, releaseDate, artist, genre, description } =
      this.createmovieForm.value as IMovie;

    const body = {
      name,
      imageUrl,
      price: +price,
      releaseDate,
      artist,
      genre,
      description,
    };

    this.movieService.createMovie(body).subscribe((response) => {
      this.router.navigate(['/movies/details/' + response.movie._id]);
    });
  }
}
