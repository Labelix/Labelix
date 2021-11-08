import {IImageAnnotation} from "../contracts/IImageAnnotation";
import {IRawImage} from "../contracts/IRawImage";
import {ICategory} from "../contracts/ICategory";
import {IBoundingBox} from "../contracts/IBoundingBox";
import {AnnotationMode} from "../utility/annotation-mode-enum";

export class ImageAnnotation implements IImageAnnotation {
  annotationMode: AnnotationMode;
  area: number;
  boundingBox: IBoundingBox | undefined;
  categoryLabel: ICategory | undefined;
  id: number;
  image: IRawImage;
  isCrowd: boolean;
  isVisible: boolean;
  segmentations: number[];

  copyProperties(other: IImageAnnotation){
    if(other !== undefined){
      this.id = other.id;
      this.area = other.area;
      this.annotationMode = other.annotationMode;
      this.boundingBox = other.boundingBox;
      this.categoryLabel = other.categoryLabel;
      this.image = other.image;
      this.isCrowd = other.isCrowd;
      this.isVisible = other.isVisible;
      this.segmentations = other.segmentations;
    }
  }
}
