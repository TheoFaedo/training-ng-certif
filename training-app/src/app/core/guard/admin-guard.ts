import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../providers/service/user-service';

export const adminGuard: CanActivateFn = () => {
  const userService = inject(UserService);

  return userService.isAdmin();
};
