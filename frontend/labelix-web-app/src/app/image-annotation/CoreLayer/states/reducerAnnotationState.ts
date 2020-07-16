import {IFile} from '../../../utility/contracts/IFile';
import {AnnotaionMode} from '../annotaionModeEnum';
import {IImageAnnotation} from '../../../utility/contracts/IImageAnnotation';
import {ActionTypes, ImageAnnotationActions} from '../actions/image-annotation.actions';
import {ICategory} from '../../../utility/contracts/ICategory';

export interface ReducerAnnotationState {
  currentAnnotatingImage: IFile;
  currentAnnotationMode: AnnotaionMode;
  currentImageAnnotations: IImageAnnotation[];
  activeLabel: ICategory;
  annotationCount: number;
}

export const initalAnnotationState: ReducerAnnotationState = {
  currentAnnotatingImage: undefined,
  currentAnnotationMode: AnnotaionMode.WHOLE_IMAGE,
  currentImageAnnotations: [],
  activeLabel: undefined,
  annotationCount: 1
};

export function annotationReducer(state = initalAnnotationState,
                                  action: ImageAnnotationActions): ReducerAnnotationState {
  switch (action.type) {
    case ActionTypes.SetCurrentAnnotationPicture: {
      return {
        currentImageAnnotations: state.currentImageAnnotations,
        currentAnnotationMode: state.currentAnnotationMode,
        currentAnnotatingImage: action.payload,
        activeLabel: state.activeLabel,
        annotationCount: state.annotationCount
      };
    }
    case ActionTypes.ChangeCurrentAnnotationMode: {
      return {
        currentAnnotationMode: action.payload,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentImageAnnotations: state.currentImageAnnotations,
        activeLabel: state.activeLabel,
        annotationCount: state.annotationCount
      };
    }
    case ActionTypes.AddImageAnnotation: {
      const tmpImages: IImageAnnotation[] = [];
      state.currentImageAnnotations.forEach(value => tmpImages.push(value));
      tmpImages.push(action.payload);
      return {
        currentImageAnnotations: tmpImages,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode,
        activeLabel: state.activeLabel,
        annotationCount: state.annotationCount
      };
    }
    case ActionTypes.ChangeCategoryOfCurrentImageAnnotation: {
      const tmpImages: IImageAnnotation[] = [];
      state.currentImageAnnotations.forEach(value => tmpImages.push(value));
      tmpImages.forEach(value => {
        if (value.image.id === state.currentAnnotatingImage.id
          && value.annotationMode === AnnotaionMode.WHOLE_IMAGE) {
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
        currentAnnotationMode: state.currentAnnotationMode,
        activeLabel: state.activeLabel,
        annotationCount: state.annotationCount
      };
    }
    case ActionTypes.ChangeActiveLabel: {
      return {
        activeLabel: action.payload,
        currentImageAnnotations: state.currentImageAnnotations,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode,
        annotationCount: state.annotationCount
      };
    }

    case ActionTypes.DeleteImageAnnotation: {
      const tmpAnnotations: IImageAnnotation[] = [];
      state.currentImageAnnotations.forEach(value => {
        if (value.id === action.payload.id) {
        } else {
          tmpAnnotations.push(value);
        }
      });
      return {
        activeLabel: state.activeLabel,
        currentImageAnnotations: tmpAnnotations,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode,
        annotationCount: state.annotationCount
      };
    }

    case ActionTypes.IncrementAnnotationCount: {
      return {
        activeLabel: state.activeLabel,
        currentImageAnnotations: state.currentImageAnnotations,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode,
        annotationCount: (state.annotationCount + 1)
      };
    }
    default:
      return state;
  }
}
