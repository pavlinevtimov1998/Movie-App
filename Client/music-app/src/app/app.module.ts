import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AlbumsModule } from './albums/albums.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    appRoutingModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AlbumsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
