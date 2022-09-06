import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './album-catalog/catalog/catalog.component';
import { HomeComponent } from './core/home/home.component';
import { DetailsComponent } from './album-catalog/details/details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'details/:albumId', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
