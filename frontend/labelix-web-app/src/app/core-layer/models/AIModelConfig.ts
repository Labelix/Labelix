import {IAIModelConfig} from '../contracts/IAIModelConfig';

export class AIModelConfig implements IAIModelConfig {
  dockerImageName: string;
  id: number;
  inputDirectory: string;
  name: string;
  options: string;
  outputDirectory: string;
  parameter: string;
}
