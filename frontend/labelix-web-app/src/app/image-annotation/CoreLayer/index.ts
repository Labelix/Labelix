import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {
  ReducerRawImageState,
  rawImageReducer,
  labelCategoryReducer,
  ReducerLabelCategoryState
} from './ReducerRawImageState';

// For the raw image state handling

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

// Methods to subscribe to

export const getAllRawImages = createSelector(
  getRawImageFeatureState,
  (state: RawImageState) => state.rawImage.rawImages
);

export const getNumberOfExistingImages = createSelector(
  getRawImageFeatureState,
  (state: RawImageState) => state.rawImage.rawImages.length
);

// For the label category handling

export const labelCategoryName = 'labelCategoryFeature';

export interface LabelCategoryState {
  labelCategory: ReducerLabelCategoryState,
}

export const labelCategoryReducers: ActionReducerMap<LabelCategoryState> = {
  labelCategory: labelCategoryReducer,
};

export const getLabelCategoryFeatureState = createFeatureSelector<LabelCategoryState>(
  labelCategoryName
);

// Methods to subscribe to

export const getAllCurrentCategoryLabels = createSelector(
  getLabelCategoryFeatureState,
  (state: LabelCategoryState) => state.labelCategory.labelCategories
);


// TODO divide this file later into multiple
