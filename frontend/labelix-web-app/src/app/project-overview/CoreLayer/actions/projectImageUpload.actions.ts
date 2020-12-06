import {Action} from '@ngrx/store';
import {IProject} from '../../../utility/contracts/IProject';
import {IRawImage} from '../../../utility/contracts/IRawImage';
import {AddConfigs, GetConfigNames} from './aiModelConfig.actions';

export enum ActionTypes {
  HowManyLeft = '[ProjectImageUpload] Gives Back how many Images need to be uploaded',
  AddRawImage = '[ProjectImageUpload] Add Raw Image To Image State',
  GetRawImages = '[ProjectImageUpload] Gets RawImages'
}

export class HowManyLeft implements Action {
  readonly type = ActionTypes.HowManyLeft;

  constructor(public payload: number) {
  }
}
export class GetRawImages implements Action{
  readonly type = ActionTypes.GetRawImages;

  constructor(public payload: IRawImage[]) {
  }
}
export class AddRawImage implements Action {
  readonly type = ActionTypes.AddRawImage;

  constructor(public payload: IRawImage) {
  }
}
export type ProjectImageUploadActions =
  | HowManyLeft
  | AddRawImage
  | GetRawImages;
