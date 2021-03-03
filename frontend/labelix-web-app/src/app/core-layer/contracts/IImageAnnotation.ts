import {IIdentifiable} from './IIdentifiable';
import {AnnotationMode} from '../utility/annotation-mode-enum';
import {ICategory} from './ICategory';
import {IRawImage} from './IRawImage';
import {IBoundingBox} from './IBoundingBox';

export interface IImageAnnotation extends IIdentifiable{
  annotationMode: AnnotationMode;
  categoryLabel: ICategory;
  isCrowd: boolean;
  segmentations: number[];
  image: IRawImage;
  area: number;
  boundingBox: IBoundingBox;
  isVisible: boolean;
}
