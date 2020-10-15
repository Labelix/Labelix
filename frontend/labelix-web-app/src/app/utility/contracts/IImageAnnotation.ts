import {IIdentifiable} from './IIdentifiable';
import {AnnotaionMode} from '../../image-annotation/CoreLayer/annotaionModeEnum';
import {ICategory} from './ICategory';
import {IRawImage} from './IRawImage';
import {IBoundingBox} from './IBoundingBox';

export interface IImageAnnotation extends IIdentifiable{
  annotationMode: AnnotaionMode;
  categoryLabel: ICategory;
  isCrowd: boolean;
  segmentations: number[];
  image: IRawImage;
  area: number;
  boundingBox: IBoundingBox;
}
