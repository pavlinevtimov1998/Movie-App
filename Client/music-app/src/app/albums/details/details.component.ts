import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Subscription, combineLatest } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

import { IAlbum } from 'src/app/core/interfaces.ts/Album-Interface';
import { IUser } from 'src/app/core/interfaces.ts/User-interface';
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
  isLoggedIn$ = this.authService.isLoggedIn$;

  currentUser!: IUser;
  isOwner!: boolean;

  constructor(
    private albumService: AlbumService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription$ = combineLatest([
      this.activatedRoute.params,
      this.authService.currentUser$,
    ])
      .pipe(
        mergeMap(([params, currentUser]) => {
          const albumId = params['albumId'];
          this.currentUser = currentUser;
          return this.albumService.getOne(albumId);
        })
      )
      .subscribe((albumData) => {
        this.isOwner = albumData.album._ownerId == this.currentUser._id;
        this.album = albumData.album;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
