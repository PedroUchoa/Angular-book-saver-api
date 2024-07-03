import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { HeaderSignComponent } from '../../components/header-sign/header-sign.component';
import { SignLayoutComponent } from '../../components/sign-layout/sign-layout.component';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    HeaderSignComponent,
    SignLayoutComponent,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent {
  signupForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    name: new FormControl('', Validators.required),
  });

  userService = inject(UsersService);
  router = inject(Router);

  constructor(private toastr:ToastrService){}

  doCreateUser() {
    if (this.signupForm.valid) {
      this.userService.createUser(this.signupForm.value).subscribe({
        next: (beers) => {
          this.toastr.success('Sign Up successfully');
          this.router.navigate(['/login']);
        },
        error: (e) => {
          alert(e.error);
        },
      });
    } else {
      this.toastr.warning('Please Check the fields and try again');
    }
  }
}
