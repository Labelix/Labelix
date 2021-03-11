import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ReducerProjectState, projectReducer} from '../reducers/reducerProjectState';

export const featureStateName = 'projectFeature';

export interface ProjectState {
  project: ReducerProjectState;
}
export const projectReducers: ActionReducerMap<ProjectState> = {
  project: projectReducer
};

export const getProjectFeatureState = createFeatureSelector<ProjectState>(
  featureStateName
);

// Methods to subscribe to

export const getAllProjects = createSelector(
  getProjectFeatureState,
  (state: ProjectState) => state.project.projects
);

export const getNumberOfExistingProjects = createSelector(
  getProjectFeatureState,
  (state: ProjectState) => state.project.projects.length
);

export const getNumberOfImagesToUpload = createSelector(
  getProjectFeatureState,
  (state: ProjectState) => state.project.numberOfImagesToUpload
);

export const getNumberOfUploadedImages = createSelector(
  getProjectFeatureState,
  (state: ProjectState) => state.project.numberOfUploadedImages
);

export const getCurrentUploadProjectName = createSelector(
  getProjectFeatureState,
  (state: ProjectState) => state.project.uploadProjectName
);
