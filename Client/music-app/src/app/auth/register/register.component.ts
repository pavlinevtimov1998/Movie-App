import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordMatching } from 'src/app/util/validators';

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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  registerHandler() {}
}
