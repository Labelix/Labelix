import {Injectable} from '@angular/core';
import {GenericApiService} from '../../../utility/logic/generic-api.service';
import {IData} from '../../../utility/contracts/IData';
import {HttpClient} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {IProject} from '../../../utility/contracts/IProject';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService extends GenericApiService<IData> {

  constructor(protected  httpClient: HttpClient, protected oauthService: OAuthService) {
    super(httpClient, oauthService);
    this.urlRoot = 'api/image';
  }
  getImageByProjectId(projectId: number): Observable<IData>{
    return this.httpClient.get<IData>(`${this.urlRoot}/FirstOfProject-${projectId}`);
  }
}
