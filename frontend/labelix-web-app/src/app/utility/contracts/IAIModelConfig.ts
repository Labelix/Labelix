import {IIdentifiable} from './IIdentifiable';

export interface IAIModelConfig extends IIdentifiable{
  name: string;
  dockerImageName: string;
  parameter: string;
  inputDirectory: string;
  outputDirectory: string;
  options: string;
}
