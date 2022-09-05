import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [NavigationComponent, FooterComponent, HomeComponent],
  imports: [CommonModule],

  exports: [NavigationComponent, FooterComponent, HomeComponent],
})
export class CoreModule {}
