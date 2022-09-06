import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './album-catalog/catalog/catalog.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'catalog/:albumId',
    component: DetailsComponent,
  },
];

export const albumRoutingModule = RouterModule.forChild(routes);
