import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {aiModelConfigReducer, ReducerAiModelConfigState} from './reducerAiModelConfigState';

export const featureStateName = 'aiModelConfigFeature';

export interface AiModelConfigState {
  aiModelConfig: ReducerAiModelConfigState;
}
export const aiModelConfigReducers: ActionReducerMap<AiModelConfigState> = {
  aiModelConfig: aiModelConfigReducer,
};
export const getAiModelConfigFeatureState = createFeatureSelector<AiModelConfigState>(
  featureStateName
);
export const GetConfigs = createSelector(
  getAiModelConfigFeatureState,
  (state: AiModelConfigState) => this.state.aiModelConfig.aiModelConfigs
);


