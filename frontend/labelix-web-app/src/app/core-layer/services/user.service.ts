import {Injectable} from '@angular/core';
import {GenericApiService} from '../utility/logic/generic-api.service';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../contracts/IUser';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericApiService<IUser> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.urlRoot = 'api/user';
  }

  addUserToProject(projectId: number, user: IUser): Observable<any> {
    return this.httpClient.put<IUser>(
      `${this.urlRoot}/AddUserToProject-` + projectId, user);
  }

  removeUserFromProject(projectId: number, user: IUser): Observable<any> {
    return this.httpClient.put<IUser>(
      `${this.urlRoot}/RemoveUserFromProject-` + projectId, user);
  }

  getUsersByProjectId(projectId: number): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(
      `${this.urlRoot}/allByProjectId-` + projectId);
  }

}
