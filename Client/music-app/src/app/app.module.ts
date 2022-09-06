import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CatalogComponent } from './album-catalog/catalog/catalog.component';
import { AlbumItemComponent } from './album-catalog/album-item/album-item.component';
import { AlbumService } from './album-catalog/album.service';
import { DetailsComponent } from './album-catalog/details/details.component';

@NgModule({
  declarations: [AppComponent, CatalogComponent, AlbumItemComponent, DetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [AlbumService],
  bootstrap: [AppComponent],
})
export class AppModule {}
