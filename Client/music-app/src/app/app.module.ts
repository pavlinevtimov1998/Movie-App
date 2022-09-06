import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AlbumsModule } from './albums/albums.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    appRoutingModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AlbumsModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory(authService: AuthService) {
        return () => authService.authenticate();
      },
      deps: [AuthService],
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
