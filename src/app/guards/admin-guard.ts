import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = async () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const user = await auth.getUser();

  if (user && auth.isAdmin(user)) {
    return true;
  }

  router.navigate(['/']);
  return false;
};