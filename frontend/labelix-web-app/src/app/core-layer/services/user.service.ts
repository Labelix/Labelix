import {Injectable} from '@angular/core';
import {GenericApiService} from '../utility/logic/generic-api.service';
import {HttpClient} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {IUser} from '../contracts/IUser';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericApiService<IUser> {

  constructor(protected httpClient: HttpClient, protected  oauthService: OAuthService) {
    super(httpClient, oauthService);
    this.urlRoot = 'api/user';
  }

  addUserToProject(projectId: number, user: IUser): Observable<any> {
    this.setHeader();
    return this.httpClient.post<IUser>(
      `${this.urlRoot}/addUserToProject-` + projectId, user,
      {headers: this.headers, responseType: 'json'});
  }
}
