import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule],
  providers: [AuthService],
  exports: [RegisterComponent, LoginComponent],
})
export class AuthModule {}
