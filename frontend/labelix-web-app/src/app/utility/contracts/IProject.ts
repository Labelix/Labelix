import {IIdentifiable} from './IIdentifiable';

export interface IProject extends IIdentifiable{
  name: string;
  creationDate: string;
  creator: string; // later here will be another interface
  finishedAnnotation: boolean;
}
