import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { passwordMatching } from 'src/app/util/validators';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  passwordControll = new FormControl(null, [
    Validators.required,
    Validators.minLength(5),
  ]);

  get passwords(): FormGroup {
    return this.registerForm.controls['passwords'] as FormGroup;
  }

  registerForm: FormGroup = this.formBuilder.group({
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    passwords: new FormGroup({
      password: this.passwordControll,
      rePass: new FormControl(null, [
        Validators.required,
        passwordMatching(this.passwordControll),
      ]),
    }),
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registerHandler() {
    const { username, email, passwords } = this.registerForm.value;

    const body = {
      username,
      email,
      password: passwords.password,
    };

    this.authService.register$(body).subscribe((data) => {
      this.authService.handleLogin(data.user);

      this.router.navigate(['/albums/catalog']);
    });
  }
}
