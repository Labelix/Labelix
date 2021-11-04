import {annotationReducer, ReducerAnnotationState} from '../reducers/reducerAnnotationState';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export const annotationStateName = 'annotationStateFeature';

export interface AnnotationState {
  annotation: ReducerAnnotationState;
}

export const annotationStateReducers: ActionReducerMap<AnnotationState> = {
  // @ts-ignore
  annotation: annotationReducer,
};

export const getAnnotationFeatureState = createFeatureSelector<AnnotationState>(
  annotationStateName
);

// Selectors to subscribe to

export const getCurrentAnnotatingImage = createSelector(
  getAnnotationFeatureState,
  (state: AnnotationState) => state.annotation.currentAnnotatingImage
);

export const getCurrentAnnotationMode = createSelector(
  getAnnotationFeatureState,
  (state: AnnotationState) => state.annotation.currentAnnotationMode
);

export const getCurrentImageAnnotations = createSelector(
  getAnnotationFeatureState,
  (state: AnnotationState) => state.annotation.currentImageAnnotations
);

export const getActiveLabel = createSelector(
  getAnnotationFeatureState,
  (state: AnnotationState) => state.annotation.activeLabel
);

export const getNextAnnotationId = createSelector(
  getAnnotationFeatureState,
  (state: AnnotationState) => state.annotation.annotationCount
);

export const getActivePolygonAnnotation = createSelector(
  getAnnotationFeatureState,
  (state: AnnotationState) => state.annotation.activeAnnotation
);

export const getActiveProject = createSelector(
  getAnnotationFeatureState,
  (state: AnnotationState) => state.annotation.activeProject
);
