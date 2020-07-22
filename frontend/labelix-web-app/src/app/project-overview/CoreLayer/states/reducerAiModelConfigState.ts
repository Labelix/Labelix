import {IAIModelConfig} from '../../../utility/contracts/IAIModelConfig';
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
        return{
          aiModelConfigs: tempActions
        };
      }
      case ActionTypes.AddConfigs: {
        const tempActions: IAIModelConfig[] = [];

       // state.aiModelConfigs.forEach(value => tempActions.push(value));
        action.payload.forEach(value => tempActions.push(value));
        return{
          aiModelConfigs: tempActions
        };
      }
      default:
        return state;
    }
}
