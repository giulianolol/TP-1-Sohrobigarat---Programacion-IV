import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const guestGuard: CanActivateFn = () => {

  console.log('GUEST GUARD EJECUTADO');
  const router = inject(Router);
  const auth = inject(AuthService);

  let user: any;

  auth.user$.subscribe(u => user = u).unsubscribe();

  if (!user) return true;

  router.navigate(['/menu']);
  return false;
};