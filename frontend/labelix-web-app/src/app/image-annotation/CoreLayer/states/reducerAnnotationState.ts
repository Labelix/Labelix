import {IRawImage} from '../../../utility/contracts/IRawImage';
import {AnnotaionMode} from '../annotaionModeEnum';
import {IImageAnnotation} from '../../../utility/contracts/IImageAnnotation';
import {ActionTypes, ImageAnnotationActions} from '../actions/image-annotation.actions';
import {ICategory} from '../../../utility/contracts/ICategory';
import {IProject} from '../../../utility/contracts/IProject';

export interface ReducerAnnotationState {
  currentAnnotatingImage: IRawImage;
  currentAnnotationMode: AnnotaionMode;
  currentImageAnnotations: IImageAnnotation[];
  activeLabel: ICategory;
  annotationCount: number;
  activeAnnotation: IImageAnnotation;
  activeProject: IProject;
}

export const initalAnnotationState: ReducerAnnotationState = {
  currentAnnotatingImage: undefined,
  currentAnnotationMode: AnnotaionMode.WHOLE_IMAGE,
  currentImageAnnotations: [],
  activeLabel: undefined,
  annotationCount: 1,
  activeAnnotation: undefined,
  activeProject: undefined
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
        annotationCount: state.annotationCount,
        activeAnnotation: state.activeAnnotation,
        activeProject: state.activeProject
      };
    }
    case ActionTypes.ChangeCurrentAnnotationMode: {
      return {
        currentAnnotationMode: action.payload,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentImageAnnotations: state.currentImageAnnotations,
        activeLabel: state.activeLabel,
        annotationCount: state.annotationCount,
        activeAnnotation: state.activeAnnotation,
        activeProject: state.activeProject
      };
    }
    case ActionTypes.AddImageAnnotation: {
      const tmpImages: IImageAnnotation[] = [];
      let existsYet = false;
      state.currentImageAnnotations.forEach(value => {
        tmpImages.push(value);
        if (value.id === action.payload.id) {
          existsYet = true;
        }
      });
      if (!existsYet) {
        tmpImages.push(action.payload);
      }
      return {
        currentImageAnnotations: tmpImages,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode,
        activeLabel: state.activeLabel,
        annotationCount: state.annotationCount,
        activeAnnotation: state.activeAnnotation,
        activeProject: state.activeProject
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
            annotationMode: value.annotationMode
          };
        }
      });

      return {
        currentImageAnnotations: tmpImages,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode,
        activeLabel: state.activeLabel,
        annotationCount: state.annotationCount,
        activeAnnotation: state.activeAnnotation,
        activeProject: state.activeProject
      };
    }
    case ActionTypes.ChangeActiveLabel: {
      return {
        activeLabel: action.payload,
        currentImageAnnotations: state.currentImageAnnotations,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode,
        annotationCount: state.annotationCount,
        activeAnnotation: state.activeAnnotation,
        activeProject: state.activeProject
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
        annotationCount: state.annotationCount,
        activeAnnotation: state.activeAnnotation,
        activeProject: state.activeProject
      };
    }

    case ActionTypes.IncrementAnnotationCount: {
      return {
        activeLabel: state.activeLabel,
        currentImageAnnotations: state.currentImageAnnotations,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode,
        annotationCount: (state.annotationCount + 1),
        activeAnnotation: state.activeAnnotation,
        activeProject: state.activeProject
      };
    }

    case ActionTypes.SetActiveAnnotation: {
      return {
        activeLabel: state.activeLabel,
        currentImageAnnotations: state.currentImageAnnotations,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode,
        annotationCount: state.annotationCount,
        activeAnnotation: action.payload,
        activeProject: state.activeProject
      };
    }

    case ActionTypes.AddPositionToActivePolygonAnnotation: {
      const tmpPositions: number[] = [];
      state.activeAnnotation.segmentations.forEach(value => tmpPositions.push(value));
      tmpPositions.push(action.payload.x);
      tmpPositions.push(action.payload.y);
      return {
        activeLabel: state.activeLabel,
        currentImageAnnotations: state.currentImageAnnotations,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode,
        annotationCount: state.annotationCount,
        activeAnnotation: {
          id: state.activeAnnotation.id,
          segmentations: tmpPositions,
          categoryLabel: state.activeAnnotation.categoryLabel,
          annotationMode: state.activeAnnotation.annotationMode,
          boundingBox: state.activeAnnotation.boundingBox,
          area: state.activeAnnotation.area,
          image: state.activeAnnotation.image,
          isCrowd: state.activeAnnotation.isCrowd
        },
        activeProject: state.activeProject
      };
    }
    case ActionTypes.AddWholeImageAnnotation: {
      const tmpAnnotations: IImageAnnotation[] = [];
      let foundWholeImage = false;
      state.currentImageAnnotations.forEach(value => {
        if (value.annotationMode === AnnotaionMode.WHOLE_IMAGE) {
          tmpAnnotations.push({
            image: value.image,
            annotationMode: AnnotaionMode.WHOLE_IMAGE,
            categoryLabel: action.payload,
            segmentations: [],
            id: value.id,
            boundingBox: undefined,
            area: -1,
            isCrowd: false
          });
          foundWholeImage = true;
        } else {
          tmpAnnotations.push(value);
        }
      });
      if (!foundWholeImage) {
        tmpAnnotations.push({
          image: state.currentAnnotatingImage,
          annotationMode: AnnotaionMode.WHOLE_IMAGE,
          categoryLabel: action.payload,
          segmentations: [],
          id: state.annotationCount,
          boundingBox: undefined,
          area: -1,
          isCrowd: false
        });
      }
      return {
        activeLabel: state.activeLabel,
        currentImageAnnotations: tmpAnnotations,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode,
        annotationCount: state.annotationCount + 1,
        activeAnnotation: state.activeAnnotation,
        activeProject: state.activeProject
      };
    }
    case ActionTypes.UpdateImageAnnotation: {
      const tmpAnnotations: IImageAnnotation[] = [];

      state.currentImageAnnotations.forEach(value => {
        if (value.id === action.payload.id) {
          tmpAnnotations.push(action.payload);
        } else {
          tmpAnnotations.push(value);
        }
      });

      return {
        activeLabel: state.activeLabel,
        currentImageAnnotations: tmpAnnotations,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode,
        annotationCount: state.annotationCount + 1,
        activeAnnotation: state.activeAnnotation.id === action.payload.id ? action.payload : state.activeAnnotation,
        activeProject: state.activeProject
      };
    }
    case ActionTypes.ReplaceActiveProject: {
      return {
        activeLabel: state.activeLabel,
        currentImageAnnotations: state.currentImageAnnotations,
        currentAnnotatingImage: state.currentAnnotatingImage,
        currentAnnotationMode: state.currentAnnotationMode,
        annotationCount: state.annotationCount,
        activeAnnotation: state.activeAnnotation,
        activeProject: action.payload
      };
    }
    case ActionTypes.ResetAnnotationState: {
      return {
        currentAnnotatingImage: undefined,
        currentAnnotationMode: AnnotaionMode.WHOLE_IMAGE,
        currentImageAnnotations: [],
        activeLabel: undefined,
        annotationCount: 1,
        activeAnnotation: undefined,
        activeProject: undefined
      };
    }
    default:
      return state;
  }
}
