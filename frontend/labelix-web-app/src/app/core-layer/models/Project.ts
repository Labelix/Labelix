import {IProject} from '../contracts/IProject';
import {ICocoFormat} from '../contracts/cocoFormat/ICocoFormat';
import {IImage} from '../contracts/IImage';

export class Project implements IProject {
  AIModelConfig: number[];
  cocoExport: ICocoFormat;
  creationDate: Date;
  description: string;
  finishedAnnotation: boolean;
  id: number;
  images: IImage[];
  label: string;
  name: string;
  timestamp: Date;
}
