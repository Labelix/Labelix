import {IIdentifiable} from './IIdentifiable';

export interface IImage extends IIdentifiable{
  Data: string;
  imageId: number;
  projectId: number;
  format: string;
  name: string;
  HeightOfData: number;
  WidthOfData: number;
}
