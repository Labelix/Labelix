import {Action} from '@ngrx/store';
import {IProject} from '../utility/contracts/IProject';
import {IRawImage} from '../utility/contracts/IRawImage';
import {AddConfigs, GetConfigNames} from './aiModelConfig.actions';

export enum ActionTypes {
  AddRawImages = '[ImageAnnotation] Add RawImages',
  HowManyLeft = '[ProjectImageUpload] Gives Back how many Images need to be uploaded',
  AddRawImage = '[ProjectImageUpload] Add Raw Image To Image State',
  GetRawImages = '[ProjectImageUpload] Gets RawImages',
  AddBase64CodeToIFile = '[ImageAnnotation] Add Base64Code to IFile',
  UpdateRawImage = '[ImageAnnotation] UpdateRawImage',
  DeleteRawImage = '[ImageAnnotation] Delete RawImage',
  DeleteAllImages = '[ImageAnnotation] Delete all RawImage'
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

export class AddRawImages implements Action {
  readonly type = ActionTypes.AddRawImages;

  constructor(public payload: IRawImage[]) {
  }
}

export class AddBase64CodeToIFile implements Action {
  readonly type = ActionTypes.AddBase64CodeToIFile;

  constructor(public payload: { id: number, baseCode: string }) {
  }
}

export class UpdateRawImage implements Action {
  readonly type = ActionTypes.UpdateRawImage;

  constructor(public payload: IRawImage) {
  }
}

export class DeleteAllImages implements Action{
  readonly type = ActionTypes.DeleteAllImages;
  constructor() {
  }
}
export type ProjectImageUploadActions =
  | HowManyLeft
  | AddRawImage
  | AddRawImages
  | GetRawImages
  | AddBase64CodeToIFile
  | UpdateRawImage
  | DeleteRawImage
  | DeleteAllImages;
