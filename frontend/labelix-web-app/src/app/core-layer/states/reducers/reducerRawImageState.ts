import {IRawImage} from '../../contracts/IRawImage';
import {ProjectImageUploadActions, ActionTypes} from '../actions/projectImageUpload.actions';

export interface ReducerRawImageState {
  rawImages: IRawImage[];
}

export const initialRawImageState: ReducerRawImageState = {
  rawImages: [],
};

export function rawImageReducer(
  state = initialRawImageState,
  action: ProjectImageUploadActions): ReducerRawImageState {

  // @ts-ignore
  switch (action.type) {

    case ActionTypes.AddRawImages: {

      const tempActions: IRawImage[] = [];
      state.rawImages.forEach(value => tempActions.push(value));
      action.payload.forEach(value => tempActions.push(value));

      return {
        rawImages: tempActions
      };
    }

    case ActionTypes.AddRawImage: {

      const tempActions: IRawImage[] = [];
      state.rawImages.forEach(value => tempActions.push(value));
      tempActions.push(action.payload);

      return {
        rawImages: tempActions
      };
    }

    case ActionTypes.UpdateRawImage: {
      const tempActions: IRawImage[] = [];

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
      const tempImages: IRawImage[] = [];
      state.rawImages.forEach(value => {
        if (value.id === action.payload.id) {
          tempImages.push({
            id: value.id,
            file: value.file,
            base64Url: action.payload.baseCode,
            height: value.height,
            width: value.width,
            name: value.name
          });
        } else {
          tempImages.push(value);
        }
      });
      return {
        rawImages: tempImages
      };
    }

    case ActionTypes.DeleteRawImage: {
      const tempImages: IRawImage[] = [];
      state.rawImages.forEach(value => {
        if (value.name !== action.payload.name) {
          tempImages.push({
            id: value.id,
            base64Url: value.base64Url,
            name: value.name,
            width: value.width,
            height: value.height,
            file: value.file
          });
        }
      });
      return {
        rawImages: tempImages
      };
    }

    case ActionTypes.DeleteAllImages: {
      return {
        rawImages: []
      };
    }
    default:
      return state;
  }
}
