import {ICategory} from '../../../utility/contracts/ICategory';
import {ActionTypes, ImageAnnotationActions} from '../actions/image-annotation.actions';

export interface ReducerLabelCategoryState {
  labelCategories: ICategory[];
  labelCount: number;
}

export const initialLabelCategoryState: ReducerLabelCategoryState = {
  labelCategories: [],
  labelCount: 1
};

export function labelCategoryReducer(state = initialLabelCategoryState, action: ImageAnnotationActions): ReducerLabelCategoryState {
  switch (action.type) {
    case ActionTypes.AddAnnotationLabel: {
      const tempLabels: ICategory[] = [];
      let existsYet = false;

      state.labelCategories.forEach(value => {
        tempLabels.push(value);
        if (value.id === action.payload.id) {
          existsYet = true;
        }
      });
      if (!existsYet) {
        tempLabels.push(action.payload);
      }
      const newLabelCount = state.labelCount + 1;
      return {
        labelCategories: tempLabels,
        labelCount: newLabelCount
      };
    }
    case ActionTypes.ResetCategoryLabelState: {
      return {
        labelCategories: [],
        labelCount: 1
      };
    }
    default:
      return state;
  }
}
