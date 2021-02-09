import {Injectable} from '@angular/core';
import {
  AnnotationState,
  getActiveLabel,
  getActivePolygonAnnotation,
  getActiveProject,
  getCurrentAnnotatingImage,
  getCurrentAnnotationMode,
  getCurrentImageAnnotations,
  getNextAnnotationId
} from '../core-layer/states/state-definitions/annotationState';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {IRawImage} from '../core-layer/contracts/IRawImage';
import {
  AddImageAnnotation,
  AddPositionToActivePolygonAnnotation,
  AddWholeImageAnnotation,
  ChangeActiveLabel,
  ChangeCategoryOfCurrentImageAnnotation,
  ChangeCurrentAnnotationMode,
  ChangeVisibilityOfImageAnnotation,
  DeleteImageAnnotation,
  IncrementAnnotationCount,
  ReplaceActiveProject,
  ResetActiveImageAnnotation,
  ResetAnnotationState,
  SetActiveAnnotation,
  SetCurrentAnnotationPicture,
  UpdateCategoryOInAnnotations,
  UpdateImageAnnotation
} from '../core-layer/states/actions/image-annotation.actions';
import {AnnotationMode} from '../core-layer/utility/annotaionModeEnum';
import {IImageAnnotation} from '../core-layer/contracts/IImageAnnotation';
import {ICategory} from '../core-layer/contracts/ICategory';
import {IProject} from '../core-layer/contracts/IProject';
import {AiModelConfigServiceService} from '../core-layer/services/aiModelConfig-service.service ';

@Injectable()
export class AnnotationFacade {

  currentAnnotationImage: Observable<IRawImage>;
  currentAnnotationMode: Observable<AnnotationMode>;
  currentImageAnnotations: Observable<IImageAnnotation[]>;
  activeLabel: Observable<ICategory>;
  numberOfCurrentImageAnnotations: Observable<number>;
  activePolygonAnnotation: Observable<IImageAnnotation>;
  activeProject: Observable<IProject>;

  changesPresent: boolean;

  constructor(private store: Store<AnnotationState>, private aiModelConfigService: AiModelConfigServiceService) {
    this.currentAnnotationImage = this.store.pipe(select(getCurrentAnnotatingImage));
    this.currentAnnotationMode = this.store.pipe(select(getCurrentAnnotationMode));
    this.currentImageAnnotations = this.store.pipe(select(getCurrentImageAnnotations));
    this.activeLabel = this.store.pipe(select(getActiveLabel));
    this.numberOfCurrentImageAnnotations = this.store.pipe(select(getNextAnnotationId));
    this.activePolygonAnnotation = this.store.pipe(select(getActivePolygonAnnotation));
    this.activeProject = this.store.pipe(select(getActiveProject));
  }

  changeCurrentAnnotationImage(input: IRawImage) {
    this.store.dispatch(new SetCurrentAnnotationPicture(input));
  }

  changeCurrentAnnotationMode(input: AnnotationMode) {
    this.store.dispatch(new ChangeCurrentAnnotationMode(input));
  }

  addImageAnnotation(input: IImageAnnotation) {
    this.store.dispatch(new AddImageAnnotation(input));
    this.store.dispatch(new IncrementAnnotationCount());
  }

  changeCurrentAnnotationCategory(input: ICategory) {
    this.store.dispatch(new ChangeCategoryOfCurrentImageAnnotation(input));
  }

  changeActiveLabel(input: ICategory) {
    this.store.dispatch(new ChangeActiveLabel(input));
  }

  deleteImageAnnotation(input: IImageAnnotation) {
    this.store.dispatch(new DeleteImageAnnotation(input));
  }

  setActiveAnnotation(input: IImageAnnotation) {
    this.store.dispatch(new SetActiveAnnotation(input));
  }

  addPointsToActivePolygonAnnotation(input: { x: number, y: number }) {
    this.store.dispatch(new AddPositionToActivePolygonAnnotation(input));
  }

  addWholeImageAnnotation(input: ICategory) {
    this.store.dispatch(new AddWholeImageAnnotation(input));
  }

  updateImageAnnotation(input: IImageAnnotation) {
    this.store.dispatch(new UpdateImageAnnotation(input));
  }

  replaceActiveProject(input: IProject) {
    this.store.dispatch(new ReplaceActiveProject(input));
  }

  resetAnnotationState() {
    this.store.dispatch(new ResetAnnotationState());
  }

  resetActiveImageAnnotation() {
    this.store.dispatch(new ResetActiveImageAnnotation());
  }

  changeVisibilityOfImageAnnotation(input: IImageAnnotation) {
    this.store.dispatch(new ChangeVisibilityOfImageAnnotation(input));
  }

  updateCategoryOnAnnotations(input: ICategory) {
    this.store.dispatch(new UpdateCategoryOInAnnotations(input));
  }
}
