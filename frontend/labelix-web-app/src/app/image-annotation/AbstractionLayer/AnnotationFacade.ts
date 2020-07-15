import {Injectable} from '@angular/core';
import {
  AnnotationState,
  getCurrentAnnotatingImage,
  getCurrentAnnotationMode, getCurrentImageAnnotations
} from '../CoreLayer/states/annotationState';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {IFile} from '../../utility/contracts/IFile';
import {
  AddImageAnnotation, ChangeCategoryOfCurrentImageAnnoation,
  ChangeCurrentAnnotationMode,
  SetCurrentAnnotationPicture
} from '../CoreLayer/actions/image-annotation.actions';
import {AnnotaionMode} from '../CoreLayer/annotaionModeEnum';
import {IImageAnnotation} from '../../utility/contracts/IImageAnnotation';
import {ICategory} from '../../utility/contracts/ICategory';

@Injectable()
export class AnnotationFacade {

  currentAnnotationImage: Observable<IFile>;
  currentAnnotationMode: Observable<AnnotaionMode>;
  currentImageAnnotations: Observable<IImageAnnotation[]>;

  constructor(private store: Store<AnnotationState>) {
    this.currentAnnotationImage = this.store.pipe(select(getCurrentAnnotatingImage));
    this.currentAnnotationMode = this.store.pipe(select(getCurrentAnnotationMode));
    this.currentImageAnnotations = this.store.pipe(select(getCurrentImageAnnotations));
  }

  changeCurrentAnnotationImage(input: IFile) {
    this.store.dispatch(new SetCurrentAnnotationPicture(input));
  }

  changeCurrentAnnotationMode(input: AnnotaionMode) {
    this.store.dispatch(new ChangeCurrentAnnotationMode(input));
  }

  addImageAnnotation(input: IImageAnnotation) {
    this.store.dispatch(new AddImageAnnotation(input));
  }

  changeCurrentAnnotationCategory(input: ICategory) {
    this.store.dispatch(new ChangeCategoryOfCurrentImageAnnoation(input));
  }
}
