import {Action} from '@ngrx/store';
import {IFile} from '../../../utility/contracts/IFile';

export enum ActionTypes{
  AddRawImages = '[ImageAnnotation] Add RawImages',
}

export class AddRawImagesAction implements Action {
  readonly type = ActionTypes.AddRawImages;
  constructor(public payload: IFile[]) {
  }
}

export type ImageAnnotationActions =
  | AddRawImagesAction;
