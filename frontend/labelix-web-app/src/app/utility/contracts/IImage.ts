import {IIdentifiable} from './IIdentifiable';

export interface IImage extends IIdentifiable{
  Data: string;
  imageId: number;
  projectId: number;
  base64: string;
}
