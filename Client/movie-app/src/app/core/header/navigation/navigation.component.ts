import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  currentUser$ = this.authService.currentUser$;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logoutHandler() {
    this.authService.logout$().subscribe(() => {
      this.router.navigate(['/']);
      this.authService.handleLogout();
    });
  }
}
