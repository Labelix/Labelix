import {IAIModelConfig} from '../utility/contracts/IAIModelConfig';
import {ActionTypes, AiModelConfigActions} from '../actions/aiModelConfig.actions';

export interface ReducerAiModelConfigState {
  aiModelConfigs: IAIModelConfig[];
}

export const initialAiModelConfigState: ReducerAiModelConfigState = {
  aiModelConfigs: [] = [],
};

export function aiModelConfigReducer(
  state = initialAiModelConfigState,
  action: AiModelConfigActions): ReducerAiModelConfigState {

  switch (action.type) {

    case ActionTypes.GetConfigNames: {

      const tempActions: IAIModelConfig[] = [];

      state.aiModelConfigs.forEach(value => tempActions.push(value));
      return {
        aiModelConfigs: tempActions
      };
    }

    case ActionTypes.AddConfigs: {
      const tempActions: IAIModelConfig[] = [];

      // state.aiModelConfigs.forEach(value => tempActions.push(value));
      action.payload.forEach(value => tempActions.push(value));
      return {
        aiModelConfigs: tempActions
      };
    }

    case ActionTypes.AddConfig: {

      const configs: IAIModelConfig[] = [];

      state.aiModelConfigs.forEach(value => configs.push(value));
      configs.push(action.payload);

      return {
        aiModelConfigs: configs
      };
    }

    case ActionTypes.UpdateConfig: {

      let index = -1;
      const configs: IAIModelConfig[] = [];

      state.aiModelConfigs.forEach(value => configs.push(value));

      configs.forEach(item => {
        if (item.id === action.payload.id) {
          index = configs.indexOf(item);
        }
      });

      if (index === -1) {
        configs.push(action.payload);
      } else {
        configs[index] = action.payload;
      }

      return {
        aiModelConfigs: configs
      };

    }

    case ActionTypes.DeleteConfig: {

      let configs: IAIModelConfig[] = [];

      state.aiModelConfigs.forEach(value => configs.push(value));

      const config = configs.find(value => value.id === action.payload);

      const index = configs.indexOf(config);

      configs.splice(index, 1);

      return {
        aiModelConfigs: configs
      };
    }

    default:
      return state;
  }

}
