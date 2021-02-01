import {Injectable} from '@angular/core';
import {GenericApiService} from '../utility/logic/generic-api.service';
import {HttpClient} from '@angular/common/http';
import {IAIModelConfig} from '../contracts/IAIModelConfig';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiModelConfigServiceService extends GenericApiService<IAIModelConfig> {

  constructor(protected  httpClient: HttpClient) {
    super(httpClient);
    this.urlRoot = 'api/AIModelConfig';
  }

  getAiConfigsByProjectId(projectId: number): Observable<IAIModelConfig[]> {
    return this.httpClient.get<IAIModelConfig[]>(`${this.urlRoot}/ByProjectId-${projectId}`);
  }

  addAiConfigToProject(projectId: number, aiConfig: IAIModelConfig): Observable<any> {
    return this.httpClient.put<IAIModelConfig[]>(
      `${this.urlRoot}/AddToProject-${projectId}`, aiConfig);
  }

  removeAiConfigFromProject(projectId: number, aiConfig: IAIModelConfig): Observable<any> {
    return this.httpClient.put<IAIModelConfig[]>(
      `${this.urlRoot}/RemoveFromProject-${projectId}`, aiConfig);
  }
}
