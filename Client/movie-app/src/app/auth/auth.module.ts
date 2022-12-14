import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material.module';
import { ProfileComponent } from './user-profile/profile/profile.component';
import { UserMoviesComponent } from './user-profile/user-movies/user-movies.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ProfileComponent, UserMoviesComponent],
  imports: [
    CommonModule,
    authRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  exports: [],
})
export class AuthModule {}
