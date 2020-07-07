import {IIdentifiable} from './IIdentifiable';

export interface IProject extends IIdentifiable{
  name: string;
  creationDate: number;
  creator: string; // later here will be another interface
}
