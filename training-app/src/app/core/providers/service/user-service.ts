import { computed, Service, signal } from '@angular/core';
import { User } from '../../../shared/model/user.model';

@Service()
export class UserService {
  private readonly _currentUser = signal<User>({
    id: 1,
    role: 'ADMIN',
  });

  public isAdmin = computed(() => this._currentUser().role === 'ADMIN');
}
