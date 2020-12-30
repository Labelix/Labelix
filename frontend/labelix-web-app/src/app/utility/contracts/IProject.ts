import {IIdentifiable} from './IIdentifiable';
import {IData} from './IData';
import {ICocoFormat} from './cocoFormat/ICocoFormat';

export interface IProject extends IIdentifiable{
  name: string;
  description: string;
  creationDate: Date;
  // creator: string; // later here will be another interface
  finishedAnnotation: boolean;
  label: string;
  images: IData[];
  timestamp: Date;
  AIModelConfig: number[];
  cocoExport: ICocoFormat;
}
