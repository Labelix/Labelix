import {Action} from '@ngrx/store';
import {IProject} from '../../../utility/contracts/IProject';
import {IRawImage} from '../../../utility/contracts/IRawImage';
import {AddConfigs, GetConfigNames} from './aiModelConfig.actions';

export enum ActionTypes {
  HowManyLeft = '[ProjectImageUpload] Gives Back how many Images need to be uploaded',
  AddRawImage = '[ProjectImageUpload] Add Raw Image To Image State'
}

export class HowManyLeft implements Action {
  readonly type = ActionTypes.HowManyLeft;

  constructor(public payload: number) {
  }
}
export class AddRawImage implements Action {
  readonly type = ActionTypes.AddRawImage;

  constructor(public payload: IRawImage) {
  }
}
export type ProjectImageUploadActions =
  | HowManyLeft
  | AddRawImage;
