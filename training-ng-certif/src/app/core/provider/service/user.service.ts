import { computed, Injectable, signal } from '@angular/core';
import { User } from '../../shared/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _user = signal<User>({
    role: 'ADMIN',
  });

  public isAdmin = computed(() => this._user().role === 'ADMIN');
}
