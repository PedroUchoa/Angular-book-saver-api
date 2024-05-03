import { Component, inject } from '@angular/core';

import { HeaderSignComponent } from '../../components/header-sign/header-sign.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { error } from 'console';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [HeaderSignComponent, RouterLink, ReactiveFormsModule, CommonModule],
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

  doCreateUser() {
    if (this.signupForm.valid) {
      this.userService.createUser(this.signupForm.value).subscribe({
        next: (beers) => {
          alert('Sign Up successfully');
          this.router.navigate(['/login']);
        },
        error:(e)=>{
          alert(e.error);
        }
      });
    } else {
      alert('Please Check the fields and try again');
    }
  }
}
