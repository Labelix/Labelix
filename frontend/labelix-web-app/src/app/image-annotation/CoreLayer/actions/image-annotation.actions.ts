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
  ChangeActiveLabel = '[ImageAnnotation] Change Active Label',
  DeleteImageAnnotation = '[ImageAnnotation] Delete Image Annotation',
  IncrementAnnotationCount = '[ImageAnnotation] Increment Annotation Count',
  SetActivePolygonAnnotation = '[ImageAnnotation] Set active Polygon Annotation',
  AddPositionToActivePolygonAnnotation = '[ImageAnnotation]Add Position to active Polygon Annotation',
  AddBase64CodeToIFile = '[ImageAnnotation] Add Base64Code to IFile',
  AddWholeImageAnnotation = '[ImageAnnotation] Add whole image annotation',
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

export class DeleteImageAnnoation implements Action {
  readonly type = ActionTypes.DeleteImageAnnotation;

  constructor(public payload: IImageAnnotation) {
  }
}

export class IncrementAnnotationCount implements Action {
  readonly type = ActionTypes.IncrementAnnotationCount;

  constructor() {
  }
}

export class AddPositionToActivePolygonAnnotation implements Action {
  readonly type = ActionTypes.AddPositionToActivePolygonAnnotation;

  constructor(public payload: {x: number, y: number}) {
  }
}

export class SetActivePolygonAnnotation implements Action {
  readonly type = ActionTypes.SetActivePolygonAnnotation;

  constructor(public payload: IImageAnnotation) {
  }
}

export class AddBase64CodeToIFile implements Action {
  readonly type = ActionTypes.AddBase64CodeToIFile;

  constructor(public payload: {id: number, baseCode: string}) {
  }
}

export class AddWholeImageAnnotation implements Action {
  readonly type = ActionTypes.AddWholeImageAnnotation;

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
  | ChangeActiveLabel
  | DeleteImageAnnoation
  | IncrementAnnotationCount
  | AddPositionToActivePolygonAnnotation
  | SetActivePolygonAnnotation
  | AddBase64CodeToIFile
  | AddWholeImageAnnotation;
