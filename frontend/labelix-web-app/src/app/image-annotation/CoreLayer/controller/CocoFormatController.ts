import {ICocoFormat} from '../../../utility/contracts/cocoFormat/ICocoFormat';
import {ICocoInfo} from '../../../utility/contracts/cocoFormat/ICocoInfo';
import {ICocoCategory} from '../../../utility/contracts/cocoFormat/ICocoCategory';
import {ICategory} from '../../../utility/contracts/ICategory';
import {ICocoImage} from '../../../utility/contracts/cocoFormat/ICocoImage';
import {IRawImage} from '../../../utility/contracts/IRawImage';
import {ICocoLicense} from '../../../utility/contracts/cocoFormat/ICocoLicense';
import {ICocoAnnotation} from '../../../utility/contracts/cocoFormat/ICocoAnnotation';
import {IImageAnnotation} from '../../../utility/contracts/IImageAnnotation';
import {IBoundingBox} from '../../../utility/contracts/IBoundingBox';
import {ImageAnnotationHelper} from '../helper/image-annotation-helper';
import {LabelCategoryFacade} from '../../AbstractionLayer/LabelCategoryFacade';
import {RawImageFacade} from '../../AbstractionLayer/RawImageFacade';
import {Injectable} from '@angular/core';

@Injectable()
export class CocoFormatController {

  createICocoInfo(
    contributor: string,
    year: number,
    url: string,
    version: string,
    dateCreated: Date,
    description: string
  ): ICocoInfo {
    return {
      contributor,
      dateCreated,
      url,
      version,
      description,
      year
    };
  }

  createListOfICocoCategory(input: ICategory[]): ICocoCategory[] {
    const result: ICocoCategory[] = [];
    input.forEach(value => result.push({id: value.id, name: value.name, supercategory: value.supercategory}));
    return result;
  }

  createListOfICocoImages(input: IRawImage[]): ICocoImage[] {
    const result: ICocoImage[] = [];
    input.forEach(value => result.push({
      dateCaptured: value.file !== undefined ? new Date(value.file.lastModified * 1000) : new Date(Date.now()),
      fileName: value.name,
      heigth: value.height,
      width: value.width,
      id: value.id,
      license: this.getTestLicense()
    }));
    return result;
  }

  getCocoAnnotations(input: IImageAnnotation[]): ICocoAnnotation[] {
    const result: ICocoAnnotation[] = [];
    input.forEach(value => {
      if (value.categoryLabel !== undefined) {
        const realPositions: number[] = this.getRealPositions(value.segmentations, value.image);
        result.push({
          area: value.boundingBox !== undefined ?
            value.boundingBox.height * value.boundingBox.width
            : this.calcSurfaceOfPolygon(realPositions),
          bbox: value.boundingBox !== undefined ? [value.boundingBox.xCoordinate,
            value.boundingBox.yCoordinate,
            value.boundingBox.height,
            value.boundingBox.width] : [0, 0, 0, 0],
          categoryId: value.categoryLabel.id,
          id: value.id,
          imageId: value.image.id,
          iscrowd: value.isCrowd,
          segmentation: realPositions
        });
      }
    });
    return result;
  }

  private calcSurfaceOfPolygon(points: number[]): number {
    let sum1 = 0;
    let sum2 = 0;

    for (let i = 2; i < points.length; i += 2) {
      sum1 += points[i - 2] * points[i + 1];
      sum2 += points[i] * points[i - 1];
    }

    return (sum1 - sum2) / 2;
  }

  private getRealPositions(percentagePositions: number[], image: IRawImage): number[] {
    const result: number[] = [];

    for (let i = 2; i <= percentagePositions.length; i += 2) {
      result.push(percentagePositions[i - 2] * image.width);
      result.push(percentagePositions[i - 1] * image.height);
    }

    return result;
  }

  // spöter soll hier die Liezens vom Projekt zurückgegeben werden
  getTestLicense(): ICocoLicense {
    return {
      url: 'testurl',
      name: 'testlicense',
      id: 1
    };
  }

  getCategoriesFromCocoFormat(input: ICocoFormat): ICategory[] {
    const result: ICategory[] = [];

    for (const current of input.categories) {
      result.push({
        name: current.name,
        id: current.id,
        colorCode: ImageAnnotationHelper.getRandomColor(),
        supercategory: current.supercategory
      });
    }

    return result;
  }

  // für jedes null muss noch eine Lösung gefunden werden
  getAnnotationsFromCocoFormat(input: ICocoFormat, rawImages: IRawImage[], categoryLabels: ICategory[]): IImageAnnotation[] {
    const result: IImageAnnotation[] = [];

    for (const current of input.annotations) {
      result.push({
        id: current.id,
        segmentations: current.segmentation,
        boundingBox: this.getBoundingBoxFromNumberArray(current.bbox),
        isCrowd: current.iscrowd,
        annotationMode: this.getFormatOfImageAnnotation(current),
        image: this.getRawImageById(current.imageId, rawImages),
        categoryLabel: this.getCategoryById(current.categoryId, categoryLabels),
        area: current.area
      });
    }
    return result;
  }

  getRawImageById(id: number, rawImages: IRawImage[]): IRawImage {
    for (const current of rawImages) {
      if (current.id === id + 1) {
        return current;
      }
    }
    return undefined;
  }

  getFormatOfImageAnnotation(annotation: ICocoAnnotation): number {
    if (annotation.bbox.length === 0 && annotation.segmentation.length === 0) {
      return 0;
    } else if (annotation.bbox.length !== 0) {
      return 1;
    } else {
      return 2;
    }
  }

  getCategoryById(id: number, categoryLabels: ICategory[]): ICategory {
    for (const current of categoryLabels) {
      if (current.id === id) {
        return current;
      }
    }
    return undefined;
  }

  getBoundingBoxFromNumberArray(input: number[]): IBoundingBox {
    return {
      xCoordinate: input[0],
      yCoordinate: input[1],
      width: input[2],
      height: input[3]
    };
  }

  createICocoFormat(info: ICocoInfo,
                    images: ICocoImage[],
                    licenses: ICocoLicense[],
                    annotations: ICocoAnnotation[],
                    categories: ICocoCategory[]): ICocoFormat {
    return {
      info,
      images,
      licenses,
      annotations,
      categories
    };
  }

}
