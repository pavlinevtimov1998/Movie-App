import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IAlbum } from 'src/app/core/interfaces.ts/Album-Interface';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  createAlbumForm: FormGroup = this.formBuilder.group({
    name: new FormControl(null, [Validators.required]),
    imageUrl: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    releaseDate: new FormControl(null, [Validators.required]),
    artist: new FormControl(null, [Validators.required]),
    genre: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private albumService: AlbumService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createAlbumHandler() {
    const { name, imageUrl, price, releaseDate, artist, genre, description } =
      this.createAlbumForm.value as IAlbum;

    const body = {
      name,
      imageUrl,
      price: +price,
      releaseDate,
      artist,
      genre,
      description,
    };

    this.albumService.createAlbum(body).subscribe((response) => {
      this.router.navigate(['/albums/details/' + response.album._id]);
    });
  }
}