import {IData} from './IData';
import {IAIModelConfig} from './IAIModelConfig';
import {IIdentifiable} from './IIdentifiable';

export interface IAILabelInfo extends IIdentifiable{
  aiModelConfig: IAIModelConfig;
  images: IData[];
}
