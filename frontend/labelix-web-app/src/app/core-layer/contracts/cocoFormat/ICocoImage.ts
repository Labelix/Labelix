import {ICocoLicense} from './ICocoLicense';

export interface ICocoImage {
  id: number;
  width: number;
  height: number;
  fileName: string;
  dateCaptured: Date;
  license: ICocoLicense;
}
