import {IIdentifiable} from './IIdentifiable';

export interface IFile extends IIdentifiable{
  id: number;
  file: File;
  height: number;
  width: number;
}
