import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {aiModelConfigReducer, ReducerAiModelConfigState} from './reducerAiModelConfigState';

export const featureAiModelConfigStateName = 'aiModelConfigFeature';

export interface AiModelConfigState {
  aiModelConfig: ReducerAiModelConfigState;
}
export const aiModelConfigReducers: ActionReducerMap<AiModelConfigState> = {
  aiModelConfig: aiModelConfigReducer,
};
export const getAiModelConfigFeatureState = createFeatureSelector<AiModelConfigState>(
  featureAiModelConfigStateName
);


export const GetConfigs = createSelector(
  getAiModelConfigFeatureState,
  (state: AiModelConfigState) => state.aiModelConfig.aiModelConfigs
);


