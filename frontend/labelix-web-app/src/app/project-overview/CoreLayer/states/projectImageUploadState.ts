import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {projectImageUploadReducer, ReducerProjectImageUploadState} from './reducerProjectImageUploadState';

export const projectImageUploadStateName = 'projectImageUploadFeature';

export interface ProjectImageUploadState {
  project: ReducerProjectImageUploadState;
}
export const projectImageUploadReducers: ActionReducerMap<ReducerProjectImageUploadState> = {
  project: projectImageUploadReducer,
};

export const getProjectFeatureState = createFeatureSelector<ReducerProjectImageUploadState>(
  projectImageUploadStateName
);

// Methods to subscribe to
