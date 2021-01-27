import {Injectable} from '@angular/core';
import {GenericApiService} from '../utility/logic/generic-api.service';
import {HttpClient} from '@angular/common/http';
import {IAIModelConfig} from '../contracts/IAIModelConfig';
import {OAuthService} from 'angular-oauth2-oidc';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiModelConfigServiceService extends GenericApiService<IAIModelConfig> {

  constructor(protected  httpClient: HttpClient, protected oauthService: OAuthService) {
    super(httpClient, oauthService);
    this.urlRoot = 'api/AIModelConfig';
  }

  getAiConfigsByProjectId(projectId: number): Observable<IAIModelConfig[]> {
    this.setHeader();
    return this.httpClient.get<IAIModelConfig[]>(
      `${this.urlRoot}/ByProjectId-${projectId}`,
      {headers: this.headers, responseType: 'json'});
  }
}
