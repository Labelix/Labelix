import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import { ReducerRawImageState, rawImageReducer} from './ReducerRawImageState';

export const featureStateName = 'rawImageFeature';

export interface RawImageState {
  rawImage: ReducerRawImageState;
}

export const rawImageReducers: ActionReducerMap<RawImageState> = {
  rawImage: rawImageReducer,
};

export const getRawImageFeatureState = createFeatureSelector<RawImageState>(
  featureStateName
);

export const getAllRawImages = createSelector(
  getRawImageFeatureState,
  (state: RawImageState) => state.rawImage.rawImages
);

export const getNumberOfExistingImages = createSelector(
  getRawImageFeatureState,
  (state: RawImageState) => state.rawImage.rawImages.length
);
