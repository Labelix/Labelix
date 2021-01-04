import {Injectable} from '@angular/core';
import {GenericApiService} from '../../../utility/logic/generic-api.service';
import {IImage} from '../../../utility/contracts/IImage';
import {HttpClient} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class ImageApiService extends GenericApiService<IImage> {

  constructor(protected  httpClient: HttpClient, protected oauthService: OAuthService) {
    super(httpClient, oauthService);
    this.urlRoot = 'http://localhost:3400/images';
  }


}

