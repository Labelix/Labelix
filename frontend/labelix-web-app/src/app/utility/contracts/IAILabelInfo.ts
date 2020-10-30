import {IImage} from './IImage';
import {IAIModelConfig} from './IAIModelConfig';

export interface IAILabelInfo {
  aiModelConfig: IAIModelConfig;
  images: IImage[];
}
