import {IRawImage} from '../../utility/contracts/IRawImage';
import {ActionTypes, ProjectImageUploadActions} from '../../actions/projectImageUpload.actions';


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
        numberOfImages: state.numberOfImages,
        rawImages: tempImages
      };
    }
    case ActionTypes.DeleteRawImage: {
      const temp: IRawImage[] = [];
      state.rawImages.forEach(value => temp.push(value));
      const rawImage: IRawImage = action.payload;
      const index = temp.indexOf(rawImage, 0);
      delete temp[index];
      return {
        numberOfImages: state.numberOfImages,
        rawImages: temp
      };
    }
    case ActionTypes.DeleteAllImages: {
      return  {
        numberOfImages: 0,
        rawImages: []
      };
    }
    default:
      return state;
  }
}
