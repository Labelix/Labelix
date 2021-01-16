import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IUser} from '../core-layer/contracts/IUser';
import {UserService} from '../core-layer/services/user.service';
import {getAllUsers, UserState} from '../core-layer/states/state-definitions/userState';
import {select, Store} from '@ngrx/store';
import {AddUsers, ClearUsers} from '../core-layer/states/actions/user.actions';

@Injectable()
export class UserFacade {
  users$: Observable<IUser[]>;

  constructor(private userApi: UserService, private store: Store<UserState>) {
    this.users$ = store.pipe(select(getAllUsers));
  }

  getUsers() {
    this.userApi.getItems().subscribe(value => {
      this.store.dispatch(new ClearUsers());
      this.store.dispatch(new AddUsers(value));
    });
  }
}
