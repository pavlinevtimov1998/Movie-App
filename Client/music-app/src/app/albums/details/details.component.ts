import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Subscription } from 'rxjs';

import { IAlbum } from 'src/app/core/interfaces.ts/Album-Interface';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  album!: IAlbum;
  subscription$!: Subscription;
  isLoading = false;

  constructor(
    private albumService: AlbumService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription$ = this.activatedRoute.params
      .pipe(
        mergeMap((params) => {
          const albumId = params['albumId'];
          return this.albumService.getOne(albumId);
        })
      )
      .subscribe((albumData) => {
        this.album = albumData.album;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
