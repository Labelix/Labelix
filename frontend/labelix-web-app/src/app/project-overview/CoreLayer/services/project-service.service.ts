import { Injectable } from '@angular/core';
import {GenericApiService} from '../../../utility/logic/generic-api.service';
import {IProject} from '../../../utility/contracts/IProject';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService extends GenericApiService<IProject>{

  constructor(protected  httpClient: HttpClient, protected oauthService: OAuthService) {
    super(httpClient, oauthService);
    this.urlRoot = 'api/project';
  }

  updateProject(item: IProject): Observable<IProject> {
    this.setHeader();
    return this.httpClient.put<IProject>(`${this.urlRoot}/update`, item, {headers: super.headers, responseType: 'json'});
  }
}
