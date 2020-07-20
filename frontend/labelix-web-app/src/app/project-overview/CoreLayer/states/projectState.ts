import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {ReducerProjectState, projectReducer} from './reducerProjectState';

export const featureStateName = 'projectFeature';

export interface ProjectState {
  project: ReducerProjectState;
}
export const projectReducers: ActionReducerMap<ProjectState> = {
  project: projectReducer,
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
  (state: ProjectState) => this.state.project.projects.length
);
