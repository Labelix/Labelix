import {IIdentifiable} from './IIdentifiable';

export interface IRawImage extends IIdentifiable{
  id: number;
  file: File;
  name: string;
  height: number;
  width: number;
  base64Url: string;
}
