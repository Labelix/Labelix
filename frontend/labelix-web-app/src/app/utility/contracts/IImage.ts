import {IIdentifiable} from './IIdentifiable';

export interface IImage extends IIdentifiable{
  imageId: number;
  projectId: number;
  base64: string;
}
