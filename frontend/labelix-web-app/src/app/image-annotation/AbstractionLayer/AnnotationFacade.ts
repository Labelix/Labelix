import {Injectable} from '@angular/core';
import {
  AnnotationState, getActiveLabel, getActivePolygonAnnotation,
  getCurrentAnnotatingImage,
  getCurrentAnnotationMode, getCurrentImageAnnotations, getNextAnnotationId
} from '../CoreLayer/states/annotationState';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {IFile} from '../../utility/contracts/IFile';
import {
  AddImageAnnotation,
  AddPositionToActivePolygonAnnotation,
  AddWholeImageAnnotation,
  ChangeActiveLabel,
  ChangeCategoryOfCurrentImageAnnoation,
  ChangeCurrentAnnotationMode,
  DeleteImageAnnoation,
  IncrementAnnotationCount,
  SetActiveAnnotation,
  SetCurrentAnnotationPicture, UpdateImageAnnotation
} from '../CoreLayer/actions/image-annotation.actions';
import {AnnotaionMode} from '../CoreLayer/annotaionModeEnum';
import {IImageAnnotation} from '../../utility/contracts/IImageAnnotation';
import {ICategory} from '../../utility/contracts/ICategory';

@Injectable()
export class AnnotationFacade {

  currentAnnotationImage: Observable<IFile>;
  currentAnnotationMode: Observable<AnnotaionMode>;
  currentImageAnnotations: Observable<IImageAnnotation[]>;
  activeLabel: Observable<ICategory>;
  numberOfCurrentImageAnnotations: Observable<number>;
  activePolygonAnnotation: Observable<IImageAnnotation>;

  constructor(private store: Store<AnnotationState>) {
    this.currentAnnotationImage = this.store.pipe(select(getCurrentAnnotatingImage));
    this.currentAnnotationMode = this.store.pipe(select(getCurrentAnnotationMode));
    this.currentImageAnnotations = this.store.pipe(select(getCurrentImageAnnotations));
    this.activeLabel = this.store.pipe(select(getActiveLabel));
    this.numberOfCurrentImageAnnotations = this.store.pipe(select(getNextAnnotationId));
    this.activePolygonAnnotation = this.store.pipe(select(getActivePolygonAnnotation));
  }

  changeCurrentAnnotationImage(input: IFile) {
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
}
