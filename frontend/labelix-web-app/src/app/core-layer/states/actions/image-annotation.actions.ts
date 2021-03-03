import {Action} from '@ngrx/store';
import {IRawImage} from '../../contracts/IRawImage';
import {ICategory} from '../../contracts/ICategory';
import {AnnotationMode} from '../../utility/annotation-mode-enum';
import {IImageAnnotation} from '../../contracts/IImageAnnotation';
import {IProject} from '../../contracts/IProject';

// TODO split these actions into different files
export enum ActionTypes {
  AddAnnotationLabel = '[ImageAnnotation] Add AnnotationLabel',
  SetCurrentAnnotationPicture = '[ImageAnnotation] Set Current Annotating Image',
  ChangeCurrentAnnotationMode = '[ImageAnnotation] Change Current Annotation Mode',
  AddImageAnnotation = '[ImageAnnotation] Add Annotation to CurrentImageAnnotations',
  ChangeCategoryOfCurrentImageAnnotation = '[ImageAnnoation] Change Category Of Current Image Annotation',
  ChangeActiveLabel = '[ImageAnnotation] Change Active Label',
  DeleteImageAnnotation = '[ImageAnnotation] Delete Image Annotation',
  IncrementAnnotationCount = '[ImageAnnotation] Increment Annotation Count',
  SetActiveAnnotation = '[ImageAnnotation] Set active Annotation',
  AddPositionToActivePolygonAnnotation = '[ImageAnnotation]Add Position to active Polygon Annotation',
  AddWholeImageAnnotation = '[ImageAnnotation] Add whole image annotation',
  UpdateImageAnnotation = '[ImageAnnotation] Update Image Annotation',
  ReplaceActiveProject = '[ImageAnnotation] Replace active project',
  ClearRawImages = '[ImageAnnotation] Clear Raw Images',
  ResetAnnotationState = '[ImageAnnotation] ResetAnnotationState',
  ResetCategoryLabelState = '[ImageAnnotation] ResetCategoryLabelState',
  ResetActiveImageAnnotation = '[ImageAnnotation] Reset Active Image Annotation to undefined',
  ChangeVisibilityOfImageAnnotation = '[ImageAnnotation] Change visibility',
  UpdateCategory = '[ImageAnnotation] Update Category',
  DeleteCategory = '[ImageAnnotation] Delete Category',
  UpdateCategoryOnAnnotations = '[ImageAnnotation] Update Category on Image Annotations'
}



export class AddAnnotationLabel implements Action {
  readonly type = ActionTypes.AddAnnotationLabel;

  constructor(public payload: ICategory) {
  }
}

export class SetCurrentAnnotationPicture implements Action {
  readonly type = ActionTypes.SetCurrentAnnotationPicture;

  constructor(public payload: IRawImage) {
  }
}

export class ChangeCurrentAnnotationMode implements Action {
  readonly type = ActionTypes.ChangeCurrentAnnotationMode;

  constructor(public payload: AnnotationMode) {
  }
}

export class AddImageAnnotation implements Action {
  readonly type = ActionTypes.AddImageAnnotation;

  constructor(public payload: IImageAnnotation) {
  }
}

export class ChangeCategoryOfCurrentImageAnnotation implements Action {
  readonly type = ActionTypes.ChangeCategoryOfCurrentImageAnnotation;

  constructor(public payload: ICategory) {
  }
}

export class ChangeActiveLabel implements Action {
  readonly type = ActionTypes.ChangeActiveLabel;

  constructor(public payload: ICategory) {
  }
}

export class DeleteImageAnnotation implements Action {
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

  constructor(public payload: { x: number, y: number }) {
  }
}

export class SetActiveAnnotation implements Action {
  readonly type = ActionTypes.SetActiveAnnotation;

  constructor(public payload: IImageAnnotation) {
  }
}

export class AddWholeImageAnnotation implements Action {
  readonly type = ActionTypes.AddWholeImageAnnotation;

  constructor(public payload: ICategory) {
  }
}

export class UpdateImageAnnotation implements Action {
  readonly type = ActionTypes.UpdateImageAnnotation;

  constructor(public payload: IImageAnnotation) {
  }
}

export class ReplaceActiveProject implements Action {
  readonly type = ActionTypes.ReplaceActiveProject;

  constructor(public payload: IProject) {
  }
}

export class ClearRawImages implements Action {
  readonly type = ActionTypes.ClearRawImages;
}

export class ResetAnnotationState implements Action {
  readonly type = ActionTypes.ResetAnnotationState;
}

export class ResetCategoryLabelState implements Action {
  readonly type = ActionTypes.ResetCategoryLabelState;
}

export class ResetActiveImageAnnotation implements Action {
  readonly type = ActionTypes.ResetActiveImageAnnotation;
}

export class ChangeVisibilityOfImageAnnotation implements Action {
  readonly type = ActionTypes.ChangeVisibilityOfImageAnnotation;

  constructor(public payload: IImageAnnotation) {
  }
}

export class UpdateCategory implements Action {
  readonly type = ActionTypes.UpdateCategory;

  constructor(public payload: ICategory) {
  }
}

export class DeleteCategory implements Action {
  readonly type = ActionTypes.DeleteCategory;

  constructor(public payload: number) {
  }
}

export class UpdateCategoryOInAnnotations implements Action {
  readonly type = ActionTypes.UpdateCategoryOnAnnotations;

  constructor(public payload: ICategory) {
  }
}


export type ImageAnnotationActions =
  | AddAnnotationLabel
  | SetCurrentAnnotationPicture
  | ChangeCurrentAnnotationMode
  | AddImageAnnotation
  | ChangeCategoryOfCurrentImageAnnotation
  | ChangeActiveLabel
  | DeleteImageAnnotation
  | IncrementAnnotationCount
  | AddPositionToActivePolygonAnnotation
  | SetActiveAnnotation
  | AddWholeImageAnnotation
  | UpdateImageAnnotation
  | ReplaceActiveProject
  | ClearRawImages
  | ResetAnnotationState
  | ResetCategoryLabelState
  | ResetActiveImageAnnotation
  | ChangeVisibilityOfImageAnnotation
  | UpdateCategory
  | DeleteCategory
  | UpdateCategoryOInAnnotations;
