import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {

  console.log('AUTH GUARD EJECUTADO');
  
  const router = inject(Router);
  const auth = inject(AuthService);

  let user: any;

  auth.user$.subscribe(u => user = u).unsubscribe();

  if (user) return true;

  router.navigate(['/login']);
  return false;
};