import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAlbum } from 'src/app/core/interfaces.ts/Album-Interface';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  albums!: IAlbum[];
  subscription!: Subscription;

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.subscription = this.catalogService
      .getAlbums()
      .subscribe((albumsData) => {
        this.albums = albumsData;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
