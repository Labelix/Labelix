import {Action} from '@ngrx/store';
import {IFile} from '../../../utility/contracts/IFile';
import {ICategory} from '../../../utility/contracts/ICategory';
import {AnnotaionMode} from '../annotaionModeEnum';
import {IImageAnnotation} from '../../../utility/contracts/IImageAnnotation';

export enum ActionTypes {
  AddRawImages = '[ImageAnnotation] Add RawImages',
  AddAnnotationLabel = '[ImageAnnotation] Add AnnotationLabel',
  SetCurrentAnnotationPicture = '[ImageAnnotation] Set Current Annotating Image',
  ChangeCurrentAnnotationMode = '[ImageAnnotation] Change Current Annotation Mode',
  AddImageAnnotation = '[ImageAnnotation] Add Annotation to CurrentImageAnnotations',
  ChangeCategoryOfCurrentImageAnnotation = '[ImageAnnoation] Change Category Of Current Image Annotation',
  UpdateRawImage = '[ImageAnnotation] UpdateRawImage',
  ChangeActiveLabel = '[ImageAnnotation] Change Active Label'
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

export class SetCurrentAnnotationPicture implements Action {
  readonly type = ActionTypes.SetCurrentAnnotationPicture;

  constructor(public payload: IFile) {
  }
}

export class ChangeCurrentAnnotationMode implements Action {
  readonly type = ActionTypes.ChangeCurrentAnnotationMode;

  constructor(public payload: AnnotaionMode) {
  }
}

export class AddImageAnnotation implements Action {
  readonly type = ActionTypes.AddImageAnnotation;

  constructor(public payload: IImageAnnotation) {
  }
}

export class ChangeCategoryOfCurrentImageAnnoation implements Action {
  readonly type = ActionTypes.ChangeCategoryOfCurrentImageAnnotation;

  constructor(public payload: ICategory) {
  }
}

export class UpdateRawImage implements Action {
  readonly type = ActionTypes.UpdateRawImage;

  constructor(public payload: IFile) {
  }
}

export class ChangeActiveLabel implements Action {
  readonly type = ActionTypes.ChangeActiveLabel;

  constructor(public payload: ICategory) {
  }
}

export type ImageAnnotationActions =
  | AddRawImagesAction
  | AddAnnotationLabel
  | SetCurrentAnnotationPicture
  | ChangeCurrentAnnotationMode
  | AddImageAnnotation
  | ChangeCategoryOfCurrentImageAnnoation
  | UpdateRawImage
  | ChangeActiveLabel;
