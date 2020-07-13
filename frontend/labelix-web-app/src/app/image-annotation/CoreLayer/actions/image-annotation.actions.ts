import {Action} from '@ngrx/store';
import {IFile} from '../../../utility/contracts/IFile';
import {ICategory} from '../../../utility/contracts/ICategory';

export enum ActionTypes{
  AddRawImages = '[ImageAnnotation] Add RawImages',
  AddAnnotationLabel = '[ImageAnnotation] Add AnnotationLabel'
}

export class AddRawImagesAction implements Action {
  readonly type = ActionTypes.AddRawImages;
  constructor(public payload: IFile[]) {
  }
}

export class AddAnnotationLabel implements Action {
  readonly type = ActionTypes.AddAnnotationLabel;
  constructor(public payload: ICategory) {
  }
}

export type ImageAnnotationActions =
  | AddRawImagesAction | AddAnnotationLabel;
