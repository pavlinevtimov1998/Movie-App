import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.guard';
import { CatalogComponent } from './movie-catalog/catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'details/:movieId',
    component: DetailsComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:movieId',
    component: EditComponent,
    canActivate: [AuthGuard],
  },
];

export const MoviesRoutingModule = RouterModule.forChild(routes);
