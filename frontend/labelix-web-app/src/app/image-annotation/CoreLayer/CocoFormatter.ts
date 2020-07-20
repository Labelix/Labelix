import {ICocoFormat} from '../../utility/contracts/cocoFormat/ICocoFormat';
import {ICocoInfo} from '../../utility/contracts/cocoFormat/ICocoInfo';
import {ICocoCategory} from '../../utility/contracts/cocoFormat/ICocoCategory';
import {ICategory} from '../../utility/contracts/ICategory';
import {ICocoImage} from '../../utility/contracts/cocoFormat/ICocoImage';
import {IFile} from '../../utility/contracts/IFile';
import {ICocoLicense} from '../../utility/contracts/cocoFormat/ICocoLicense';
import {ICocoAnnotation} from '../../utility/contracts/cocoFormat/ICocoAnnotation';
import {IImageAnnotation} from '../../utility/contracts/IImageAnnotation';

export class CocoFormatter {

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

  createListOfICocoImages(input: IFile[]): ICocoImage[] {
    const result: ICocoImage[] = [];
    input.forEach(value => result.push({
      dateCaptured: new Date(value.file.lastModified * 1000),
      fileName: value.file.name,
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
          area: this.calcSurfaceOfPolygon(realPositions),
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

  private getRealPositions(percentagePositions: number[], image: IFile): number[] {
    const result: number[] = [];

    for (let i = 2; i <= percentagePositions.length; i += 2) {
      result.push(percentagePositions[i - 2] * image.width);
      result.push(percentagePositions[i - 1] * image.height);
    }

    return result;
  }

  getTestLicense(): ICocoLicense {
    return {
      url: 'testurl',
      name: 'testlicense',
      id: 1
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
