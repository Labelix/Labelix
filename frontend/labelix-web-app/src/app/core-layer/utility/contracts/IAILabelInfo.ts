import {IImage} from './IImage';
import {IAIModelConfig} from './IAIModelConfig';
import {IIdentifiable} from './IIdentifiable';

export interface IAILabelInfo extends IIdentifiable{
  aiModelConfig: IAIModelConfig;
  images: IImage[];
}
