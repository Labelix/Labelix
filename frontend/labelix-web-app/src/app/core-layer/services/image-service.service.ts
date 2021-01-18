import {Injectable} from '@angular/core';
import {GenericApiService} from '../utility/logic/generic-api.service';
import {IImage} from '../utility/contracts/IImage';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService extends GenericApiService<IImage> {

  constructor(protected  httpClient: HttpClient, protected oauthService: OAuthService) {
    super(httpClient, oauthService);
    this.urlRoot = 'api/image';
  }
  getImageByProjectId(projectId: number): Observable<IImage>{
    this.setHeader();
    return this.httpClient.get<IImage>(`${this.urlRoot}/FirstOfProject-${projectId}`, {headers: this.headers, responseType: 'json'});
  }
}
