import {Injectable} from '@angular/core';
import {GenericApiService} from '../utility/logic/generic-api.service';
import {IRawImage} from '../utility/contracts/IRawImage';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';
import {IImage} from '../utility/contracts/IImage';

@Injectable({
  providedIn: 'root'
})
export class ImageApi extends GenericApiService<IImage> {

  constructor(protected httpClient: HttpClient, protected oauthService: OAuthService) {
    super(httpClient, oauthService);
    this.urlRoot = 'api/Image';
  }

  getImageByProjectId(projectId: number): Observable<IImage> {
    this.setHeader();
    return this.httpClient.get<IImage>(`${this.urlRoot}/FirstOfProject-${projectId}`, {headers: this.headers, responseType: 'json'});
  }

}
