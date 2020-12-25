import { Injectable } from '@angular/core';
import {GenericApiService} from '../../../utility/logic/generic-api.service';
import {HttpClient} from '@angular/common/http';
import {IAIModelConfig} from '../../../utility/contracts/IAIModelConfig';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AiModelConfigServiceService extends GenericApiService<IAIModelConfig>{

  constructor(protected  httpClient: HttpClient, protected oauthService: OAuthService) {
    super(httpClient, oauthService);
    this.urlRoot = 'api/AIModelConfig';
  }
}
