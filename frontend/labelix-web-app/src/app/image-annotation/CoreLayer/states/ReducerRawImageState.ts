import {IFile} from '../../../utility/contracts/IFile';
import {ActionTypes, ImageAnnotationActions} from '../actions/image-annotation.actions';

export interface ReducerRawImageState {
  rawImages: IFile[];
}

export const initialRawImageState: ReducerRawImageState = {
  rawImages: [],
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
    case ActionTypes.UpdateRawImage: {
      const tempActions: IFile[] = [];

      state.rawImages.forEach(value => {
        if (value.id === action.payload.id) {
          tempActions.push(action.payload);
        } else {
          tempActions.push(value);
        }
      });

      return {
        rawImages: tempActions
      };
    }
    default:
      return state;
  }
}
