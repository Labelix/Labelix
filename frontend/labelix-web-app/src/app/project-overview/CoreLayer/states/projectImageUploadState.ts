import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {projectImageUploadReducer, ReducerProjectImageUploadState} from './reducerProjectImageUploadState';
import {getRawImageFeatureState} from '../../../image-annotation/CoreLayer/states/rawImageState';

export const projectImageUploadStateName = 'projectImageUploadFeature';

export interface ProjectImageUploadState {
  project: ReducerProjectImageUploadState;
}
export const projectImageUploadReducers: ActionReducerMap<ProjectImageUploadState> = {
  project: projectImageUploadReducer,
};

export const getRawImageState = createFeatureSelector<ProjectImageUploadState>(
  projectImageUploadStateName
);

export const getAllRawImages = createSelector(
  getRawImageState,
  (state: ProjectImageUploadState) => state.project.rawImages
);
export const getNumberOfRawImages = createSelector(
  getRawImageState,
  (state: ProjectImageUploadState) => state.project.rawImages.length
);

// Methods to subscribe to
