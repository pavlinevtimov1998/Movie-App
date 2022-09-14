import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  loginHandler() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    const { username, password } = this.loginForm.value;

    const body = {
      username,
      password,
    };

    this.authService.login$(body).subscribe((data) => {
      this.authService.handleLogin(data.user);
      this.router.navigate(['/movies/catalog']);
    });
  }
}
