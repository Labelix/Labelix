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

  constructor() {

  }

  copyProperties(other: IProject) {
    if (other !== undefined) {
      this.id = other.id;
      this.AIModelConfig = other.AIModelConfig;
      this.description = other.description;
      this.cocoExport = other.cocoExport;
      this.creationDate = other.creationDate;
      this.images = other.images;
      this.finishedAnnotation = other.finishedAnnotation;
      this.label = other.label;
      this.timestamp = other.timestamp;
      this.name = other.name;
    }
  }
}
