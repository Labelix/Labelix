import {IProject} from '../../contracts/IProject';
import {ActionTypes, ProjectActions} from '../actions/project.actions';

export interface ReducerProjectState {
  projects: IProject[];
  numberOfImagesToUpload: number;
  numberOfUploadedImages: number;
  uploadProjectName: string;
}

export const initialProjectState: ReducerProjectState = {
  projects: [],
  numberOfImagesToUpload: undefined,
  numberOfUploadedImages: undefined,
  uploadProjectName: undefined
};

export function projectReducer(
  state = initialProjectState,
  action: ProjectActions): ReducerProjectState {

  switch (action.type) {

    case ActionTypes.AddProject: {
      const tempActions: IProject[] = [];

      state.projects.forEach(value => tempActions.push(value));
      tempActions.push(action.payload);
      return {
        projects: tempActions,
        numberOfImagesToUpload: state.numberOfImagesToUpload,
        numberOfUploadedImages: state.numberOfImagesToUpload,
        uploadProjectName: state.uploadProjectName
      };
    }
    case ActionTypes.DeleteProject: {
      const tempActions: IProject[] = [];

      state.projects.forEach(value => {
        if (value.id !== action.payload.id) {
          tempActions.push(value);
        }
      });
      return {
        projects: tempActions,
        numberOfImagesToUpload: state.numberOfImagesToUpload,
        numberOfUploadedImages: state.numberOfImagesToUpload,
        uploadProjectName: state.uploadProjectName
      };
    }
    case ActionTypes.GetProjects: {
      const iProjects: IProject[] = [];

      // state.projects.forEach(value => tempActions.push(value));
      action.payload.forEach(value => iProjects.push(value));
      return {
        projects: iProjects,
        numberOfImagesToUpload: state.numberOfImagesToUpload,
        numberOfUploadedImages: state.numberOfImagesToUpload,
        uploadProjectName: state.uploadProjectName
      };
    }
    case ActionTypes.ClearUploadInformation: {
      return {
        projects: state.projects,
        uploadProjectName: undefined,
        numberOfUploadedImages: undefined,
        numberOfImagesToUpload: undefined
      };
    }
    case ActionTypes.IncreaseNumberOfUploadedImages: {
      return {
        projects: state.projects,
        uploadProjectName: state.uploadProjectName,
        numberOfUploadedImages: state.numberOfUploadedImages + 1,
        numberOfImagesToUpload: state.numberOfImagesToUpload
      };
    }
    case ActionTypes.SetNameOfUploadProject: {
      return {
        projects: state.projects,
        uploadProjectName: action.payload,
        numberOfUploadedImages: state.numberOfUploadedImages,
        numberOfImagesToUpload: state.numberOfImagesToUpload
      };
    }
    case ActionTypes.SetNumberOfImagesToUpload: {
      return {
        projects: state.projects,
        uploadProjectName: state.uploadProjectName,
        numberOfUploadedImages: 0,
        numberOfImagesToUpload: action.payload
      };
    }
    default:
      return state;
  }
}
