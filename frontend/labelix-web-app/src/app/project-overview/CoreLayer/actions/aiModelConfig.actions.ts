import {Action} from '@ngrx/store';
import {IAIModelConfig} from '../../../utility/contracts/IAIModelConfig';

export enum ActionTypes {
  GetConfigNames = '[AIModelConfig] Returns all names of existing AIModelConfigs',
  AddConfigs = '[] Adds an Arry of AIModelConfigs'
}

export class GetConfigNames implements Action{
  readonly type = ActionTypes.GetConfigNames;

  constructor() {
  }
}

export class AddConfigs implements Action{
  readonly type = ActionTypes.AddConfigs;

  constructor(public payload: IAIModelConfig[]) {
  }
}

export type AiModelConfigActions =
  | GetConfigNames
  | AddConfigs;
