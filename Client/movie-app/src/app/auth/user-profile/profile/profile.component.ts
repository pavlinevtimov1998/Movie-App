import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/core/interfaces.ts/User-interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  isEditMode = false;
  currentUser!: IUser;
  profileEditForm!: FormGroup;

  isLoading = false;

  subscribtion$ = new Subscription();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.subscribtion$.add(
      this.authService.currentUser$.subscribe({
        next: (user) => {
          this.currentUser = user;
          this.isLoading = false;
        },
      })
    );
    this.profileEditForm = this.formBuilder.group({
      username: new FormControl(this.currentUser.username, []),
      email: new FormControl(this.currentUser.email, []),
    });
  }

  profileEditHandler() {
    if (this.profileEditForm.invalid) {
      return;
    }

    this.isLoading = true;

    const { username, email } = this.profileEditForm.value;

    const body = {
      username,
      email,
    };

    this.authService
      .editProfile(body, this.currentUser._id as string)
      .subscribe({
        next: (response) => {
          this.currentUser = response.user;
          this.authService.handleLogin(response.user);
          this.isLoading = false;
          this.isEditMode = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscribtion$.unsubscribe();
  }
}
