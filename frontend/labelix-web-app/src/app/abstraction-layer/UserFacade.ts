import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IUser} from '../core-layer/contracts/IUser';
import {UserService} from '../core-layer/services/user.service';
import {getAllUsers, UserState} from '../core-layer/states/state-definitions/userState';
import {select, Store} from '@ngrx/store';
import {AddUsers, ClearUsers} from '../core-layer/states/actions/user.actions';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';


// is responsible for everything which has to do with users, this involves authentication and management of other users
@Injectable()
export class UserFacade {

  currentUser: KeycloakProfile;
  users$: Observable<IUser[]>;
  isLoggedIn$: Subject<boolean>;

  constructor(private userApi: UserService,
              private keycloakService: KeycloakService,
              private store: Store<UserState>) {

    this.keycloakService.loadUserProfile().then(value => this.currentUser = value);
    this.users$ = store.pipe(select(getAllUsers));
    this.isLoggedIn$ = new Subject<boolean>();
  }

  getIdentityClaims(): KeycloakProfile {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.keycloakService.getUserRoles().filter(value => value === 'admin').length === 1;
  }

  async checkLoggedIn(): Promise<boolean> {
    return await this.keycloakService.isLoggedIn();
  }

  async login() {
    await this.keycloakService.login({
      redirectUri: window.location.origin,
    });
  }

  logout() {
    this.keycloakService.logout();
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
