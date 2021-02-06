import {Component, OnDestroy, OnInit} from '@angular/core';
import {AiModelConfigFacade} from '../../../abstraction-layer/AiModelConfigFacade';
import {IAIModelConfig} from '../../../core-layer/contracts/IAIModelConfig';
import {Subscription} from 'rxjs';
import {AIModelConfig} from '../../../core-layer/models/AIModelConfig';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-ai-config-settings',
  templateUrl: './ai-config-settings.component.html',
  styleUrls: ['./ai-config-settings.component.css']
})
export class AiConfigSettingsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  configs: IAIModelConfig[];
  currentConfig: AIModelConfig;

  initialName: string;

  isInit = true;
  addMode = false;

  constructor(private aiConfigFacade: AiModelConfigFacade,
              private snackbar: MatSnackBar) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {

    this.subscription.add(this.aiConfigFacade.aiModelConfigs$.subscribe(value => {

      this.configs = value;
      if (this.isInit && this.configs[0] !== undefined) {
        this.selectConfig(this.configs[0]);
        this.isInit = false;
      }

    }));

    this.aiConfigFacade.loadAllConfigsToState();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

      this.initialName = other.name;

    }

  }

  switchAddModeOn() {
    this.addMode = true;
    this.currentConfig = new AIModelConfig();
  }

  switchAddModOff() {
    this.addMode = false;
    this.selectConfig(this.configs[0]);
  }

  addConfig() {
    if (this.checkIfInputsAreValid()) {
      this.aiConfigFacade.postConfig(this.currentConfig).subscribe(value => {
        this.aiConfigFacade.addToState(value);
        this.addMode = false;
        this.selectConfig(this.configs[this.configs.length - 1]);
      });
    }
  }

  updateConfig() {
    if (this.checkIfInputsAreValid()) {
      this.aiConfigFacade.putConfig(this.currentConfig).subscribe(value => {
        this.aiConfigFacade.updateToState(value);
      });
    }
  }

  deleteConfig() {
    this.aiConfigFacade.deleteConfig(this.currentConfig).subscribe(value => {
      const currentIndex = this.configs.findIndex(aiConfig => aiConfig.id === this.currentConfig.id);
      const nextIndex = (currentIndex - 1) >= 0 ? currentIndex - 1 : currentIndex + 1;

      this.aiConfigFacade.deleteToState(this.currentConfig);

      if (this.configs.length === 0) {
        this.switchAddModeOn();
      } else {
        this.selectConfig(this.configs[nextIndex]);
      }
    });
  }

  checkIfInputsAreValid(): boolean {

    if (this.currentConfig.name === undefined || this.currentConfig.dockerImageName === undefined ||
      this.currentConfig.name.length === 0 || this.currentConfig.dockerImageName.length === 0) {

      this.snackbar.open('Name and Docker-Image are required!', 'ok', {duration: 5000});
      return false;
    } else if (this.initialName !== this.selectConfig.name && this.checkIfNameAlreadyExists(this.currentConfig.name, this.configs)) {
      this.snackbar.open('An AI-Config with this name is already present!', 'ok', {duration: 5000});
      return false;
    }

    return true;
  }

  checkIfNameAlreadyExists(newName: string, configs: IAIModelConfig[]): boolean {

    for (const aiConfig of configs) {
      if (newName === aiConfig.name) {
        return true;
      }
    }

    return false;
  }

}
