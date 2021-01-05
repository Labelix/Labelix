import {Action} from '@ngrx/store';
import {IAIModelConfig} from '../utility/contracts/IAIModelConfig';

export enum ActionTypes {
  GetConfigNames = '[AIModelConfig] Returns all names of existing AIModelConfigs',
  AddConfigs = '[] Adds an Array of AIModelConfigs',
  AddConfig = 'Adds only one AIModelConfig',
  UpdateConfig = 'Updates an AIModelConfig',
  DeleteConfig = 'Deletes an AIModelConfig'
}

export class GetConfigNames implements Action {
  readonly type = ActionTypes.GetConfigNames;

  constructor() {
  }
}

export class AddConfigs implements Action {
  readonly type = ActionTypes.AddConfigs;

  constructor(public payload: IAIModelConfig[]) {
  }
}

export class AddConfig implements Action {
  readonly type = ActionTypes.AddConfig;

  constructor(public payload: IAIModelConfig) {
  }
}

export class UpdateConfig implements Action {
  readonly type = ActionTypes.UpdateConfig;

  constructor(public payload: IAIModelConfig) {
  }
}

export class DeleteConfig implements Action {
  readonly type = ActionTypes.DeleteConfig;

  constructor(public payload: number) {
  }
}

export type AiModelConfigActions =
  | GetConfigNames
  | AddConfigs
  | AddConfig
  | UpdateConfig
  | DeleteConfig;
