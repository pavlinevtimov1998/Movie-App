import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './header/navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from '../material.module';
import { NavListComponent } from './header/nav-list/nav-list.component';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavListComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],

  exports: [
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    NavListComponent,
  ],
})
export class CoreModule {}
