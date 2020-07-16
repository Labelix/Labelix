import {ICocoLicense} from './ICocoLicense';

export interface ICocoImage {
  id: number;
  width: number;
  heigth: number;
  fileName: string;
  dateCaptured: Date;
  license: ICocoLicense;
}
