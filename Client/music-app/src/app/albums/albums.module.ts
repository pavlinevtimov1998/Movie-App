import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './album-catalog/catalog/catalog.component';
import { AlbumItemComponent } from './album-catalog/album-item/album-item.component';
import { DetailsComponent } from './details/details.component';
import { albumRoutingModule } from './album-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlbumService } from './album.service';

@NgModule({
  declarations: [CatalogComponent, AlbumItemComponent, DetailsComponent],
  imports: [CommonModule, albumRoutingModule, MatProgressSpinnerModule],
  providers: [AlbumService],
  exports: [CatalogComponent, AlbumItemComponent, DetailsComponent],
})
export class AlbumsModule {}
