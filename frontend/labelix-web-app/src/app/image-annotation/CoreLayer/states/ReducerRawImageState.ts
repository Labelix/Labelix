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
    case ActionTypes.AddBase64CodeToIFile: {
      const tempImages: IFile[] = [];
      state.rawImages.forEach(value => {
        if (value.id === action.payload.id) {
          tempImages.push({
            id: value.id,
            file: value.file,
            base64Url: action.payload.baseCode,
            height: value.height,
            width: value.width
          });
        } else {
          tempImages.push(value);
        }
      });
      return {
        rawImages: tempImages
      };
    }
    default:
      return state;
  }
}
