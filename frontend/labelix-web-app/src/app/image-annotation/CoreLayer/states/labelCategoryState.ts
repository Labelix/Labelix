import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {labelCategoryReducer, ReducerLabelCategoryState} from './reducerLabelCategoryState';

export const labelCategoryName = 'labelCategoryFeature';

export interface LabelCategoryState {
  labelCategory: ReducerLabelCategoryState;
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

export const getNumberOfExistingLabels = createSelector(
  getLabelCategoryFeatureState,
  (state: LabelCategoryState) => state.labelCategory.labelCategories.length
);