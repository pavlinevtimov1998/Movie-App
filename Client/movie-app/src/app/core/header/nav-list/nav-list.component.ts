import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatListItem } from '@angular/material/list';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.css'],
})
export class NavListComponent implements OnInit {
  @Output() handleClose = new EventEmitter<void>();
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onClose(logout?: MatListItem) {
    if (logout) {
      this.authService.logout$().subscribe((response) => {
        this.router.navigate(['/movies/catalog']);
        this.authService.handleLogout();
      });
    }
    this.handleClose.emit();
  }
}
