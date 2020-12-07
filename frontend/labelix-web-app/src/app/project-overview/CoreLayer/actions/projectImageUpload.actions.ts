import {Action} from '@ngrx/store';
import {IProject} from '../../../utility/contracts/IProject';
import {IRawImage} from '../../../utility/contracts/IRawImage';
import {AddConfigs, GetConfigNames} from './aiModelConfig.actions';

export enum ActionTypes {
  HowManyLeft = '[ProjectImageUpload] Gives Back how many Images need to be uploaded',
  AddRawImage = '[ProjectImageUpload] Add Raw Image To Image State',
  GetRawImages = '[ProjectImageUpload] Gets RawImages',
  AddBase64CodeToIFile = '[ImageAnnotation] Add Base64Code to IFile',
  DeleteRawImage = '[ImageAnnotation] Delete RawImage',
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
export class DeleteRawImage implements Action{
  readonly type = ActionTypes.DeleteRawImage;

  constructor(public payload: IRawImage) {
  }
}
export class AddRawImage implements Action {
  readonly type = ActionTypes.AddRawImage;

  constructor(public payload: IRawImage) {
  }
}
export class AddBase64CodeToIFile implements Action {
  readonly type = ActionTypes.AddBase64CodeToIFile;

  constructor(public payload: { id: number, baseCode: string }) {
  }
}
export type ProjectImageUploadActions =
  | HowManyLeft
  | AddRawImage
  | GetRawImages
  | AddBase64CodeToIFile
  | DeleteRawImage;
