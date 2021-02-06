import {IIdentifiable} from './IIdentifiable';

export interface ICategory extends IIdentifiable{
  supercategory: string;
  name: string;
  colorCode: string;
}


