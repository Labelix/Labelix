import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IUser} from '../core-layer/contracts/IUser';
import {UserService} from '../core-layer/services/user.service';
import {getAllUsers, UserState} from '../core-layer/states/state-definitions/userState';
import {select, Store} from '@ngrx/store';
import {AddUsers, ClearUsers} from '../core-layer/states/actions/user.actions';
import {OAuthService} from 'angular-oauth2-oidc';
import {tokenReference} from '@angular/compiler';


// is responsible for everything which has to do with users, this involves authentication and management of other users
@Injectable()
export class UserFacade {

  users$: Observable<IUser[]>;
  isLoggedIn$: Subject<boolean>;

  constructor(private userApi: UserService,
              private oauthService: OAuthService,
              private store: Store<UserState>) {
    this.users$ = store.pipe(select(getAllUsers));
    this.isLoggedIn$ = new Subject<boolean>();
  }

  getIdentityClaims(): object {
    return this.oauthService.getIdentityClaims();
  }

  isAdmin(): boolean {
    // @ts-ignore
    return this.oauthService.getIdentityClaims().roles.indexOf('admin') !== -1;
  }

  checkLoggedIn(): boolean {
    const hasIdToken = this.oauthService.hasValidIdToken();
    const hasAccessToken = this.oauthService.hasValidAccessToken();
    return (hasAccessToken || this.getIdentityClaims() !== null);
  }

  login() {
    this.oauthService.tryLogin()
      .catch(err => {
        console.error(err);
      })
      .then(() => {
        if (!this.oauthService.hasValidAccessToken()) {
          this.oauthService.initLoginFlow();
        } else {
          this.isLoggedIn$.next(true);
        }
      });
  }

  logout() {
    this.oauthService.logOut();
    this.isLoggedIn$.next(false);
  }

  loadUsersIntoState() {
    this.userApi.getItems().subscribe(value => {
      this.store.dispatch(new ClearUsers());
      this.store.dispatch(new AddUsers(value));
    });
  }

  getUsersByProjectId(projectId: number): Observable<IUser[]> {
    return this.userApi.getUsersByProjectId(projectId);
  }

  addUserToProjectViaId(projectId: number, other: IUser): Observable<any> {
    return this.userApi.addUserToProject(projectId, other);
  }

  removeUserFromProjectViaId(projectId: number, other: IUser): Observable<any> {
    return this.userApi.removeUserFromProject(projectId, other);
  }
}
