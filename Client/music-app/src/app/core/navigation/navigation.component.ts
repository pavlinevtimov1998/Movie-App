import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { IUser } from '../interfaces.ts/User-interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logoutHandler() {
    this.authService.logout$().subscribe(() => {
      this.authService.hendleLogout();
    });
  }
}
