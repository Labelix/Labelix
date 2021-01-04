import {Injectable} from '@angular/core';
import {GenericApiService} from '../../../utility/logic/generic-api.service';
import {IAILabelInfo} from '../../../utility/contracts/IAILabelInfo';
import {HttpClient} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class LabelInfoService extends GenericApiService<IAILabelInfo> {

  constructor(protected  httpClient: HttpClient, protected oauthService: OAuthService) {
    super(httpClient, oauthService);
    this.urlRoot = 'AIConfig';
  }
}
