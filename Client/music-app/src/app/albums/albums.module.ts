import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { CatalogComponent } from './album-catalog/catalog/catalog.component';
import { AlbumItemComponent } from './album-catalog/album-item/album-item.component';
import { DetailsComponent } from './details/details.component';
import { albumRoutingModule } from './album-routing.module';
import { AlbumService } from './album.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    CatalogComponent,
    AlbumItemComponent,
    DetailsComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    albumRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    YouTubePlayerModule,
  ],
  providers: [AlbumService],
  exports: [CatalogComponent, AlbumItemComponent, DetailsComponent],
})
export class AlbumsModule {}
