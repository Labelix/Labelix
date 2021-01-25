import {ICocoInfo} from './ICocoInfo';
import {ICocoImage} from './ICocoImage';
import {ICocoLicense} from './ICocoLicense';
import {ICocoAnnotation} from './ICocoAnnotation';
import {ICocoCategory} from './ICocoCategory';

export interface ICocoFormat {
  info: ICocoInfo;
  images: ICocoImage[];
  licenses: ICocoLicense[];
  annotations: ICocoAnnotation[];
  categories: ICocoCategory[];
}
