import {ICategory} from '../../../utility/contracts/ICategory';
import {ActionTypes, ImageAnnotationActions} from '../actions/image-annotation.actions';

export interface ReducerLabelCategoryState {
  labelCategories: ICategory[];
}

export const initialLabelCategoryState: ReducerLabelCategoryState = {
  labelCategories: [],
};

export function labelCategoryReducer(state = initialLabelCategoryState, action: ImageAnnotationActions): ReducerLabelCategoryState {
  switch (action.type) {
    case ActionTypes.AddAnnotationLabel: {
      const tempLabels: ICategory[] = [];

      state.labelCategories.forEach(value => tempLabels.push(value));
      tempLabels.push(action.payload);

      return {
        labelCategories: tempLabels
      };
    }
    default:
      return state;
  }
}
