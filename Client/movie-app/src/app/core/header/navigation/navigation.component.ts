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
  subscribtion = new Subscription();

  isLoggedIn$ = this.authService.isLoggedIn$;
  currentUser!: IUser;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscribtion.add(
      this.authService.currentUser$.subscribe({
        next: (user) => {
          this.currentUser = user;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  logoutHandler() {
    this.authService.logout$().subscribe(() => {
      this.router.navigate(['/']);
      this.authService.handleLogout();
    });
  }
}
