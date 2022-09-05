import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CatalogComponent } from './album-catalog/catalog/catalog.component';
import { AlbumItemComponent } from './album-catalog/album-item/album-item.component';

@NgModule({
  declarations: [AppComponent, CatalogComponent, AlbumItemComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
