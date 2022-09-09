import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  @Input() sideNav!: MatSidenav;
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logoutHandler() {
    this.authService.logout$().subscribe(() => {
      this.router.navigate(['/']);
      this.authService.handleLogout();
    });
  }
}
