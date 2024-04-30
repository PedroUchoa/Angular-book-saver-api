import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  userService = inject(UsersService);
  router = inject(Router)

  makeLogin() {

    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (data) => { this.router.navigate(['/home'])},
        (error) => alert('Login or Password invalid, please try again')
      );
    } else {
      alert('Complete your login informations');
    }
  }
}
