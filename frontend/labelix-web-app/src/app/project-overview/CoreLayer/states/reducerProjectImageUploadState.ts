import {IRawImage} from '../../../utility/contracts/IRawImage';
import {ActionTypes, ProjectImageUploadActions} from '../actions/projectImageUpload.actions';


export interface ReducerProjectImageUploadState {
  rawImages: IRawImage[];
  numberOfImages: number;
}

export const initialProjectImageUploadConfigState: ReducerProjectImageUploadState = {
  rawImages: [],
  numberOfImages: 0,
};

export function projectImageUploadReducer(
  state = initialProjectImageUploadConfigState,
  action: ProjectImageUploadActions): ReducerProjectImageUploadState {

  switch (action.type) {
    case ActionTypes.HowManyLeft: {
      return {
        rawImages: state.rawImages,
        numberOfImages: action.payload,
      };
    }
    case ActionTypes.AddRawImage: {
      const tmpList: IRawImage[] = [];
      state.rawImages.forEach(value => tmpList.push(value));
      tmpList.push(action.payload);
      return {
        numberOfImages: state.numberOfImages,
        rawImages: tmpList,
      };
    }
    case ActionTypes.GetRawImages: {
      const tempActions: IRawImage[] = [];
      action.payload.forEach(value => tempActions.push(value));
      return{
        numberOfImages: state.numberOfImages,
        rawImages: tempActions
      };
    }
    default:
      return state;
  }
}
