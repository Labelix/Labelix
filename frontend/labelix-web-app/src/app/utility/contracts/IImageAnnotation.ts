import {IIdentifiable} from './IIdentifiable';
import {AnnotaionMode} from '../../image-annotation/CoreLayer/annotaionModeEnum';
import {ICategory} from './ICategory';
import {IFile} from './IFile';
import {IBoundingBox} from './IBoundingBox';

export interface IImageAnnotation extends IIdentifiable{
  annotationMode: AnnotaionMode;
  categoryLabel: ICategory;
  isCrowd: boolean;
  segmentations: number[];
  image: IFile;
  area: number;
  boundingBox: IBoundingBox;
}
