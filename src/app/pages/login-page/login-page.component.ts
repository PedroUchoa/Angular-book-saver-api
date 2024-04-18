import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { response } from 'express';
import { Router } from '@angular/router';
import { error } from 'console';

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
      this.userService.createUser(this.loginForm.value).subscribe(
        (data) => {localStorage.setItem('token', data.token), this.router.navigate(['/home'])},
        (error) => alert('Login or Password invalid, please try again')
      );
    } else {
      alert('Complete your login informations');
    }
  }
}
