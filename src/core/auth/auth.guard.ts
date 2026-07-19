import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  console.log('GUARD');  
  console.log('AUTH', auth.isAuthenticated());

  if (auth.isAuthenticated()) {
    console.log('LIBEROU');
    return true;
  }

  console.log('BLOQUEOU');

  return router.createUrlTree(
    ['/login'],
    {
      queryParams: {
        redirect: state.url
      }
    }
  );
};