import {ICategory} from '../utility/contracts/ICategory';
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
      return {
        labelCategories: tempLabels,
      };
    }
    case ActionTypes.ResetCategoryLabelState: {
      return {
        labelCategories: [],
      };
    }
    case ActionTypes.UpdateCategory: {
      const tempLabels: ICategory[] = [];

      for (const current of state.labelCategories) {
        if (current.id === action.payload.id) {
          tempLabels.push(action.payload);
        } else {
          tempLabels.push(current);
        }
      }
      return {
        labelCategories: tempLabels,
      };
    }
    case ActionTypes.DeleteCategory: {
      const tempLabels: ICategory[] = [];
      for (const current of state.labelCategories) {
        if (current.id !== action.payload) {
          tempLabels.push(current);
        }
      }
      return {
        labelCategories: tempLabels,
      };
    }
    default:
      return state;
  }
}
