import {ICocoFormat} from '../../utility/contracts/cocoFormat/ICocoFormat';
import {ICocoInfo} from '../../utility/contracts/cocoFormat/ICocoInfo';
import {ICocoCategory} from '../../utility/contracts/cocoFormat/ICocoCategory';
import {ICategory} from '../../utility/contracts/ICategory';
import {ICocoImage} from '../../utility/contracts/cocoFormat/ICocoImage';
import {IFile} from '../../utility/contracts/IFile';
import {ICocoLicense} from '../../utility/contracts/cocoFormat/ICocoLicense';
import {ICocoAnnotation} from '../../utility/contracts/cocoFormat/ICocoAnnotation';
import {IImageAnnotation} from '../../utility/contracts/IImageAnnotation';

export class CocoFormater {

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
    input.forEach(value => result.push({
      area: value.area,
      bbox: [value.boundingBox.xCoordinate,
        value.boundingBox.yCoordinate,
        value.boundingBox.height,
        value.boundingBox.width],
      categoryId: value.categoryLabel.id,
      id: value.id,
      imageId: value.image.id,
      iscrowd: value.isCrowd,
      segmentation: value.segmentations
    }));
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

  convertToJson(input: ICocoFormat) {
    const jsonCode = JSON.stringify(input);
    console.log(jsonCode);
  }
}
