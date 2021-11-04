import {IIdentifiable} from './IIdentifiable';

export interface IRawImage extends IIdentifiable{
  id: number;
  file: File | undefined;
  name: string;
  height: number | undefined;
  width: number | undefined;
  base64Url: string;
}
