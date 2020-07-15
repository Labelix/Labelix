import {IFile} from '../../../utility/contracts/IFile';
import {AnnotaionMode} from '../annotaionModeEnum';
import {IImageAnnotation} from '../../../utility/contracts/IImageAnnotation';
import {ActionTypes, ImageAnnotationActions} from '../actions/image-annotation.actions';

export interface ReducerAnnotationState {
  currentAnnotatingImage: IFile;
  currentAnnotationMode: AnnotaionMode;
  currentImageAnnotations: IImageAnnotation[];
}

export const initalAnnotationState: ReducerAnnotationState = {
  currentAnnotatingImage: undefined,
  currentAnnotationMode: AnnotaionMode.WHOLE_IMAGE,
  currentImageAnnotations: [],
};

export function annotationReducer(state = initalAnnotationState,
                                  action: ImageAnnotationActions): ReducerAnnotationState {
  switch (action.type) {
    case ActionTypes.SetCurrentAnnotationPicture: {
      return {
        currentImageAnnotations: state.currentImageAnnotations,
        currentAnnotationMode: state.currentAnnotationMode,
        currentAnnotatingImage: action.payload
      };
    }
    case ActionTypes.ChangeCurrentAnnotationMode: {
      return {
        currentAnnotationMode: action.payload,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentImageAnnotations: state.currentImageAnnotations
      };
    }
    case ActionTypes.AddImageAnnotation: {
      const tmpImages: IImageAnnotation[] = [];
      state.currentImageAnnotations.forEach(value => tmpImages.push(value));
      tmpImages.push(action.payload);
      return {
        currentImageAnnotations: tmpImages,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode
      };
    }
    case ActionTypes.ChangeCategoryOfCurrentImageAnnotation: {
      const tmpImages: IImageAnnotation[] = [];
      state.currentImageAnnotations.forEach(value => tmpImages.push(value));
      tmpImages.forEach(value => {
        if (value.image.id === state.currentAnnotatingImage.id) {
          tmpImages[tmpImages.indexOf(value)] = {
            categoryLabel: action.payload,
            id: value.id,
            isCrowd: value.isCrowd,
            image: value.image,
            segmentations: value.segmentations,
            boundingBox: value.boundingBox,
            area: value.area,
            annotationMode: value.annotationMode,
          };
        }
      });

      return {
        currentImageAnnotations: tmpImages,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode
      };
    }
    default:
      return state;
  }
}
