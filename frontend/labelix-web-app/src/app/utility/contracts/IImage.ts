import {IIdentifiable} from './IIdentifiable';

export interface IImage extends IIdentifiable{
  imagePath: string;
  labeledPath: string;
}
