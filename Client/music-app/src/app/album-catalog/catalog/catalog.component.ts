import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAlbum } from 'src/app/core/interfaces.ts/Album-Interface';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  albums!: IAlbum[];
  subscription!: Subscription;
  isLoading = false;
  constructor(private catalogService: AlbumService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.catalogService
      .getAlbums()
      .subscribe((albumsData) => {
        this.albums = albumsData;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
