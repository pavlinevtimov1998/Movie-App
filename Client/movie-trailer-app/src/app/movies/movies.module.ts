import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { CatalogComponent } from './movie-catalog/catalog/catalog.component';
import { MovieItemComponent } from './movie-catalog/movie-item/movie-item.component';
import { DetailsComponent } from './details/details.component';
import { MoviesRoutingModule } from './movie-routing.module';
import { MovieService } from './movie.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    CatalogComponent,
    MovieItemComponent,
    DetailsComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    YouTubePlayerModule,
  ],
  providers: [MovieService],
  exports: [CatalogComponent, MovieItemComponent, DetailsComponent],
})
export class MoviesModule {}
