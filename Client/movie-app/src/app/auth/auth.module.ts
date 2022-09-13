import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ProfileComponent],
  imports: [
    CommonModule,
    authRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  exports: [RegisterComponent, LoginComponent],
})
export class AuthModule {}
