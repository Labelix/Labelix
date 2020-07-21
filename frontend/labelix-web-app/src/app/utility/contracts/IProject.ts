import {IIdentifiable} from './IIdentifiable';
import {IImage} from './IImage';

export interface IProject extends IIdentifiable{
  name: string;
  description: string;
  creationDate: Date;
  //creator: string; // later here will be another interface
  finishedAnnotation: boolean;
  label: string;
  images: IImage[];
  timestamp: Date;
}
