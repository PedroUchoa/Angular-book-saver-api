import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { HeaderSignComponent } from '../../components/header-sign/header-sign.component';
import { UsersService } from '../../services/users.service';
import { SignLayoutComponent } from '../../components/sign-layout/sign-layout.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HeaderSignComponent,
    SignLayoutComponent,
    RouterLink,
  ],
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
  router = inject(Router);

  constructor(private toastr:ToastrService){}

  makeLogin() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (data) => {
          this.router.navigate(['/home']);
        },
        (error) => this.toastr.error('Login or Password invalid, please try again')
      );
    } else {
      this.toastr.warning('Complete your login informations');
    }
  }
}
