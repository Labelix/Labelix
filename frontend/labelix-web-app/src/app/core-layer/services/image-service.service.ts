import {Injectable} from '@angular/core';
import {GenericApiService} from '../utility/logic/generic-api.service';
import {HttpClient} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {Observable} from 'rxjs';
import {IImage} from '../utility/contracts/IImage';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService extends GenericApiService<IImage> {

  constructor(protected  httpClient: HttpClient, protected oauthService: OAuthService) {
    super(httpClient, oauthService);
    this.urlRoot = 'api/image';
  }
  getImageByProjectId(projectId: number): Observable<IImage>{
    return this.httpClient.get<IImage>(`${this.urlRoot}/FirstOfProject-${projectId}`);
  }
}
