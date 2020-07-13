import {IFile} from '../../utility/contracts/IFile';
import {ActionTypes, ImageAnnotationActions} from './actions/image-annotation.actions';
import {ICategory} from '../../utility/contracts/ICategory';

export interface ReducerRawImageState {
  rawImages: IFile[];
}

export interface ReducerLabelCategoryState {
  labelCategories: ICategory[];
}

export const initialRawImageState: ReducerRawImageState = {
  rawImages: [],
};

export const initialLabelCategoryState: ReducerLabelCategoryState = {
  labelCategories: [],
};

export function rawImageReducer(
  state = initialRawImageState,
  action: ImageAnnotationActions): ReducerRawImageState {
  switch (action.type) {
    case ActionTypes.AddRawImages: {
      const tempActions: IFile[] = [];

      state.rawImages.forEach(value => tempActions.push(value));
      action.payload.forEach(value => tempActions.push(value));

      return {
        rawImages: tempActions
      };
    }
    default:
      return state;
  }
}

export function labelCategoryReducer(state = initialLabelCategoryState, action: ImageAnnotationActions): ReducerLabelCategoryState {
  switch (action.type) {
    case ActionTypes.AddAnnotationLabel: {
      const tempLabels: ICategory[] = [];
      state.labelCategories.forEach(value => tempLabels.push(value));

      return {
        labelCategories: tempLabels
      };
    }
  }
}
