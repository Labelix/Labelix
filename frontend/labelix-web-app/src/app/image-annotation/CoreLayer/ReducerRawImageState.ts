import {IFile} from '../../utility/contracts/IFile';
import {ActionTypes, ImageAnnotationActions} from './actions/image-annotation.actions';

export interface ReducerRawImageState {
  rawImages: IFile[];
}

export const initialState: ReducerRawImageState = {
  rawImages: [],
};

export function rawImageReducer(
  state = initialState,
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
