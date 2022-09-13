import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './user-profile/profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

export const authRoutingModule = RouterModule.forChild(routes);
