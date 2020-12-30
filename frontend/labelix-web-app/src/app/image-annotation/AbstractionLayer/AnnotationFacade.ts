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
  ChangeCategoryOfCurrentImageAnnotation,
  ChangeCurrentAnnotationMode, ChangeVisibilityOfImageAnnotation,
  DeleteImageAnnotation,
  IncrementAnnotationCount, ReplaceActiveProject, ResetActiveImageAnnotation, ResetAnnotationState,
  SetActiveAnnotation,
  SetCurrentAnnotationPicture, UpdateCategoryOInAnnotations, UpdateImageAnnotation
} from '../CoreLayer/actions/image-annotation.actions';
import {AnnotaionMode} from '../CoreLayer/annotaionModeEnum';
import {IImageAnnotation} from '../../utility/contracts/IImageAnnotation';
import {ICategory} from '../../utility/contracts/ICategory';
import {IProject} from '../../utility/contracts/IProject';
import {LabelInfoService} from '../CoreLayer/services/label-info.service';
import {BitmaskCocoConverter} from '../../utility/logic/bitmask-logic/bitmask-coco-converter';
import {LabelCategoryFacade} from './LabelCategoryFacade';
import {IAILabelInfo} from '../../utility/contracts/IAILabelInfo';
import {ImageAnnotationHelper} from '../CoreLayer/helper/image-annotation-helper';
import {RawImageFacade} from './RawImageFacade';
import {IData} from '../../utility/contracts/IData';
import {AiModelConfigFacade} from '../../project-overview/AbstractionLayer/AiModelConfigFacade';
import {IAIModelConfig} from '../../utility/contracts/IAIModelConfig';

@Injectable()
export class AnnotationFacade {

  currentAnnotationImage: Observable<IRawImage>;
  currentAnnotationMode: Observable<AnnotaionMode>;
  currentImageAnnotations: Observable<IImageAnnotation[]>;
  activeLabel: Observable<ICategory>;
  numberOfCurrentImageAnnotations: Observable<number>;
  activePolygonAnnotation: Observable<IImageAnnotation>;
  activeProject: Observable<IProject>;

  constructor(private store: Store<AnnotationState>,
              private labelInfoApi: LabelInfoService,
              private categoryFacade: LabelCategoryFacade,
              private rawImageFacade: RawImageFacade,
              private aiModelConfigFacade: AiModelConfigFacade) {

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

  sendAllToAI(project: IProject, aiConfig: IAIModelConfig) {

    const labelInfo: IAILabelInfo = {
      id: 0,
      aiModelConfig: aiConfig,
      images: project.images
    };

    this.labelInfoApi.postLabelInfo(labelInfo).subscribe(response => {
      let nextCategoryId: number;
      let images: IRawImage[];
      const newCategories: ICategory[] = [];

      this.categoryFacade.nextLabelId$.subscribe(value => nextCategoryId = value);
      this.rawImageFacade.files$.subscribe(value => images = value);

      const bitmaskConverter = new BitmaskCocoConverter();

      for (const data of response) {

        const category = this.getCategoryForAILabel(data, newCategories, nextCategoryId);
        const imageName = data.name.split('_')[0] + '.' + data.name.split('.')[1];
        const rawImage = images.find(value => value.name === imageName);

        const newAnnotation = bitmaskConverter.convertBase64ToAnnotation(data, rawImage, category);
        this.addImageAnnotation(newAnnotation);
      }

      // add new created categories to the category state
      for (const category of newCategories) {
        this.categoryFacade.addLabelCategory(category);
      }
    });
  }

  private getCategoryForAILabel(data: IData, newCategories: ICategory[], nextCategoryId: number): ICategory {
    let labelName = data.name.split('_')[1];
    labelName = labelName.split('.')[0];

    let category: ICategory;

    if (newCategories.every(value => value.name !== labelName)) {
      category = {
        name: labelName,
        id: nextCategoryId,
        colorCode: ImageAnnotationHelper.getRandomColor(),
        supercategory: labelName
      };
      newCategories.push(category);
    } else {
      category = newCategories.find(value => value.name === labelName);
    }
    return category;
  }
}
