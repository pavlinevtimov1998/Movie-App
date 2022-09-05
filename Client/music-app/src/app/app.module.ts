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
import { CatalogService } from './album-catalog/catalog.service';

@NgModule({
  declarations: [AppComponent, CatalogComponent, AlbumItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [CatalogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
