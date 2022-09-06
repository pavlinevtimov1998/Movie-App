import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'albums',
    loadChildren: () =>
      import('./albums/albums.module').then((m) => m.AlbumsModule),
  },
];

export const appRoutingModule = RouterModule.forRoot(routes);
