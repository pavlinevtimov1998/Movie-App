import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth.service';
import { MaterialModule } from './material.module';
import { AuthGuard } from './auth/auth-guard.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    appRoutingModule,
    MaterialModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MoviesModule,
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
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
