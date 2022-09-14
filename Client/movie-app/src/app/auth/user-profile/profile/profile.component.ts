import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isEditMode = false;
  currentUser$ = this.authService.currentUser$;
  profileEditForm!: FormGroup;

  subscribtion$ = new Subscription();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.profileEditForm = this.formBuilder.group({
      username: new FormControl(null, []),
      email: new FormControl(null, []),
      imageUrl: new FormControl(null, []),
    });
  }

  profileEditHandler() {
    if (this.profileEditForm.invalid) {
      return;
    }

    const { username, email, imageUrl } = this.profileEditForm.value;

    const body = {
      username,
      email,
      imageUrl,
    };

    this.isEditMode = false;
  }
}
