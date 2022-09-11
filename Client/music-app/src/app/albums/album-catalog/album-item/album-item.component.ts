import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { combineLatest, mergeMap, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IAlbum } from 'src/app/core/interfaces.ts/Album-Interface';
import { AlbumService } from '../../album.service';

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css'],
})
export class AlbumItemComponent implements OnInit, OnDestroy {
  @Input() album!: IAlbum;

  isLoggedIn$ = this.authService.isLoggedIn$;
  isOwner!: boolean;
  isLiked = false;

  subscription = new Subscription();

  constructor(
    private albumService: AlbumService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.currentUser$.subscribe((user) => {
        if (user.username.length > 0) {
          this.isOwner = user._id == this.album._ownerId;
        }

        this.isLiked = !!this.album.likes?.find(
          (like) => like._ownerId == user._id
        );

      })
    );
  }

  likeHandler(albumId: string) {
    this.subscription.add(
      combineLatest([
        this.authService.currentUser$,
        this.albumService.likeAlbum({ albumId }),
      ]).subscribe(([user, response]) => {
        this.isLiked = true;
        if (user._id) {
          this.album.likes?.push({
            _ownerId: user._id,
            albumId: this.album._id,
          });
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
