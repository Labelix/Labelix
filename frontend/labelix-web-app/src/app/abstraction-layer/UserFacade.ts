import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IUser} from '../core-layer/contracts/IUser';
import {UserService} from '../core-layer/services/user.service';
import {getAllUsers, UserState} from '../core-layer/states/state-definitions/userState';
import {select, Store} from '@ngrx/store';
import {AddUsers, ClearUsers} from '../core-layer/states/actions/user.actions';
import {OAuthService} from 'angular-oauth2-oidc';


// is responsible for everything which has to do with users, this involves authentication and management of other users
@Injectable()
export class UserFacade {

  users$: Observable<IUser[]>;

  constructor(private userApi: UserService,
              private oauthService: OAuthService,
              private store: Store<UserState>) {
    this.users$ = store.pipe(select(getAllUsers));
  }

  getIdentityClaims(): object {
    return this.oauthService.getIdentityClaims();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  isAdmin(): boolean {
    // @ts-ignore
    return this.oauthService.getIdentityClaims().roles.indexOf('admin') !== -1;
  }

  login() {
    this.oauthService.tryLogin()
      .catch(err => {
        console.error(err);
      })
      .then(() => {
        if (!this.oauthService.hasValidAccessToken()) {
          this.oauthService.initImplicitFlow();
        }
      });
  }

  logout() {
    this.oauthService.logOut();
  }

  getUsers() {
    this.userApi.getItems().subscribe(value => {
      this.store.dispatch(new ClearUsers());
      this.store.dispatch(new AddUsers(value));
    });
  }
}
