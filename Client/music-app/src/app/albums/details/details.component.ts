import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Subscription, combineLatest, mergeAll } from 'rxjs';
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
  subscription$ = new Subscription();
  isLoading = false;
  canLike!: any;

  isLoggedIn$ = this.authService.isLoggedIn$;
  currentUser!: IUser;
  isOwner!: boolean;

  constructor(
    private albumService: AlbumService,
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
            const albumId = params['albumId'];
            this.currentUser = currentUser;
            return this.albumService.getOne(albumId);
          })
        )
        .subscribe((albumData) => {
          this.isOwner = albumData.album._ownerId == this.currentUser._id;
          this.canLike = albumData.album.likes?.find(
            (a) => a._ownerId == this.currentUser._id
          );
          this.album = albumData.album;

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
            const albumId = params['albumId'];
            return this.albumService.deleteAlbum(albumId);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/catalog']);
        })
    );
  }

  likeHandler() {
    this.isLoading = true;
    this.subscription$.add(
      this.activatedRoute.params
        .pipe(
          mergeMap((params) => {
            const albumId = params['albumId'];
            return this.albumService.likeAlbum({ albumId });
          })
        )

        .subscribe(() => {
          this.album.likes?.push({
            _ownerId: this.currentUser._id,
            albumId: this.album._id,
          });
          this.canLike = !this.canLike;
          this.isLoading = false;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
