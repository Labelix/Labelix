import {Injectable} from '@angular/core';
import {
  AnnotationState, getActiveLabel, getActivePolygonAnnotation, getActiveProject,
  getCurrentAnnotatingImage,
  getCurrentAnnotationMode, getCurrentImageAnnotations, getNextAnnotationId
} from '../CoreLayer/states/annotationState';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {IRawImage} from '../../utility/contracts/IRawImage';
import {
  AddImageAnnotation,
  AddPositionToActivePolygonAnnotation,
  AddWholeImageAnnotation,
  ChangeActiveLabel,
  ChangeCategoryOfCurrentImageAnnoation,
  ChangeCurrentAnnotationMode,
  DeleteImageAnnoation,
  IncrementAnnotationCount, ReplaceActiveProject,
  SetActiveAnnotation,
  SetCurrentAnnotationPicture, UpdateImageAnnotation
} from '../CoreLayer/actions/image-annotation.actions';
import {AnnotaionMode} from '../CoreLayer/annotaionModeEnum';
import {IImageAnnotation} from '../../utility/contracts/IImageAnnotation';
import {ICategory} from '../../utility/contracts/ICategory';
import {IProject} from '../../utility/contracts/IProject';

@Injectable()
export class AnnotationFacade {

  currentAnnotationImage: Observable<IRawImage>;
  currentAnnotationMode: Observable<AnnotaionMode>;
  currentImageAnnotations: Observable<IImageAnnotation[]>;
  activeLabel: Observable<ICategory>;
  numberOfCurrentImageAnnotations: Observable<number>;
  activePolygonAnnotation: Observable<IImageAnnotation>;
  activeProject: Observable<IProject>;

  constructor(private store: Store<AnnotationState>) {
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

  changeCurrentAnnotationMode(input: AnnotaionMode) {
    this.store.dispatch(new ChangeCurrentAnnotationMode(input));
  }

  addImageAnnotation(input: IImageAnnotation) {
    this.store.dispatch(new AddImageAnnotation(input));
    this.store.dispatch(new IncrementAnnotationCount());
  }

  changeCurrentAnnotationCategory(input: ICategory) {
    this.store.dispatch(new ChangeCategoryOfCurrentImageAnnoation(input));
  }

  changeActiveLabel(input: ICategory) {
    this.store.dispatch(new ChangeActiveLabel(input));
  }

  deleteImageAnnotaion(input: IImageAnnotation) {
    this.store.dispatch(new DeleteImageAnnoation(input));
  }

  setActivePolygonAnnotation(input: IImageAnnotation) {
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
}
