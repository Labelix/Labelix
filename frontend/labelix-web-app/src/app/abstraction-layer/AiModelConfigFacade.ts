import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IAIModelConfig} from '../core-layer/contracts/IAIModelConfig';
import {select, Store} from '@ngrx/store';
import {AiModelConfigState, GetConfigs} from '../core-layer/states/state-definitions/aiModelConfigState';
import {AddConfig, AddConfigs, DeleteConfig, UpdateConfig} from '../core-layer/states/actions/aiModelConfig.actions';
import {AiModelConfigServiceService} from '../core-layer/services/aiModelConfig-service.service ';

@Injectable()
export class AiModelConfigFacade {

  aiModelConfigs$: Observable<IAIModelConfig[]>;

  constructor(private aiModelConfigApi: AiModelConfigServiceService, private store: Store<AiModelConfigState>) {
    this.aiModelConfigs$ = this.store.pipe(select(GetConfigs));
  }

  loadAllConfigsToState() {
    this.aiModelConfigApi.getItems().subscribe((value: IAIModelConfig[]) => {
      this.store.dispatch(new AddConfigs(value));
    });
  }

  addToState(config: IAIModelConfig) {
    this.store.dispatch(new AddConfig(config));
  }

  updateToState(config: IAIModelConfig) {
    this.store.dispatch(new UpdateConfig(config));
  }

  deleteToState(config: IAIModelConfig) {
    this.store.dispatch(new DeleteConfig(config.id));
  }

  postConfig(config: IAIModelConfig): Observable<IAIModelConfig> {
    return this.aiModelConfigApi.postItem(config);
  }

  putConfig(config: IAIModelConfig): Observable<IAIModelConfig> {
    return this.aiModelConfigApi.putItem(config);
  }

  deleteConfig(config: IAIModelConfig): Observable<any> {
    return this.aiModelConfigApi.deleteItem(config);
  }

  getConfigsByProjectId(projectId: number): Observable<IAIModelConfig[]> {
    return this.aiModelConfigApi.getAiConfigsByProjectId(projectId);
  }

  addAiConfigToProjectViaId(projectId: number, other: IAIModelConfig): Observable<any> {
    return this.aiModelConfigApi.addAiConfigToProject(projectId, other);
  }

  removeAiConfigFromProjectViaId(projectId: number, other: IAIModelConfig): Observable<any> {
    return this.aiModelConfigApi.removeAiConfigFromProject(projectId, other);
  }
}
