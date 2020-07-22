import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IAIModelConfig} from '../../utility/contracts/IAIModelConfig';
import {AiModelConfigServiceService} from '../CoreLayer/services/aiModelConfig-service.service ';
import {select, Store} from '@ngrx/store';
import {AiModelConfigState, GetConfigs} from '../CoreLayer/states/aiModelConfigState';
import {AddConfigs} from '../CoreLayer/actions/aiModelConfig.actions';

@Injectable()
export class AiModelConfigFacade {
  aiModelConfigs$: Observable<IAIModelConfig[]>;


  constructor(private aiModelConfigApi: AiModelConfigServiceService, private store: Store<AiModelConfigState>) {
    this.aiModelConfigs$ = this.store.pipe(select(GetConfigs));
  }

  getConfigs() {
    this.aiModelConfigApi.getItems().subscribe((value: IAIModelConfig[]) => {
      value.forEach(value1 => console.log(value1.name));
      this.store.dispatch(new AddConfigs(value));
    });
  }

}
