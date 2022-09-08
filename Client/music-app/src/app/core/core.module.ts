import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [NavigationComponent, FooterComponent, HomeComponent, PageNotFoundComponent],
  imports: [CommonModule, RouterModule],

  exports: [NavigationComponent, FooterComponent, HomeComponent],
})
export class CoreModule {}
