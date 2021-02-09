import {IIdentifiable} from './IIdentifiable';

export interface IImage extends IIdentifiable{
  Data: string;
  imageId: number;
  projectId: number;
  format: string;
  Name: string;
  Height: number;
  Width: number;
}
