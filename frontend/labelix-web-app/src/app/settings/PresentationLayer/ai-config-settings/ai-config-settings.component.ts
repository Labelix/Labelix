import {Component, OnDestroy, OnInit} from '@angular/core';
import {AiModelConfigFacade} from '../../../project-overview/AbstractionLayer/AiModelConfigFacade';
import {IAIModelConfig} from '../../../utility/contracts/IAIModelConfig';

@Component({
  selector: 'app-ai-config-settings',
  templateUrl: './ai-config-settings.component.html',
  styleUrls: ['./ai-config-settings.component.css']
})
export class AiConfigSettingsComponent implements OnInit {

  configs: IAIModelConfig[];
  currentConfig: LocalConfig;

  isInit = true;
  addMode = false;

  constructor(private aiConfigFacade: AiModelConfigFacade) {
  }

  ngOnInit(): void {

    this.aiConfigFacade.aiModelConfigs$.subscribe(value => {

      this.configs = value;
      if (this.isInit && this.configs[0] !== undefined) {
        this.selectConfig(this.configs[0]);
        this.isInit = false;
      }

    });

    this.aiConfigFacade.getConfigs();
  }

  selectConfig(other: IAIModelConfig) {

    if (other !== undefined) {

      this.currentConfig = {
        dockerImageName: other.dockerImageName,
        id: other.id,
        inputDirectory: other.inputDirectory,
        name: other.name,
        options: other.options,
        outputDirectory: other.outputDirectory,
        parameter: other.parameter
      };

    }

  }

  switchAddModeOn() {
    this.addMode = true;
    this.currentConfig = new LocalConfig();
  }

  switchAddModOff() {
    this.addMode = false;
    this.selectConfig(this.configs[0]);
  }

  addConfig() {
    this.aiConfigFacade.postConfig(this.currentConfig).subscribe(value => {
      this.aiConfigFacade.addToState(value);
    });
  }

  updateConfig() {
    this.aiConfigFacade.putConfig(this.currentConfig).subscribe(value => {
      this.aiConfigFacade.updateToState(value);
    });
  }

  deleteConfig() {
    this.aiConfigFacade.deleteConfig(this.currentConfig).subscribe(value => {
      this.aiConfigFacade.deleteToState(this.currentConfig);
    });
  }

}

class LocalConfig implements IAIModelConfig {
  dockerImageName: string;
  id: number;
  inputDirectory: string;
  name: string;
  options: string;
  outputDirectory: string;
  parameter: string;
}
