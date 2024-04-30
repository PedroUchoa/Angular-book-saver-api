import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UsersService } from './users.service';


export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const userService = inject(UsersService)
  const localToken = localStorage.getItem('token');

  userService.getUSerByTokenJwt(localToken).subscribe(
    (data)=>{},
    (error) => {
      router.navigateByUrl('login')
      return false
    }
  )

    return true

};
