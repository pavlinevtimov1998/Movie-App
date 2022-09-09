import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../../auth.service';
import { IUser } from '../../interfaces.ts/User-interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  @Input() sideNav!: MatSidenav;
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logoutHandler() {
    this.authService.logout$().subscribe(() => {
      this.authService.handleLogout();
    });
  }
}
