import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.guard';
import { CatalogComponent } from './album-catalog/catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'details/:albumId',
    component: DetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:albumId',
    component: EditComponent,
    canActivate: [AuthGuard],
  },
];

export const albumRoutingModule = RouterModule.forChild(routes);
