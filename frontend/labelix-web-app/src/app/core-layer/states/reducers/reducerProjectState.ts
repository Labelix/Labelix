import {IProject} from '../../contracts/IProject';
import {ActionTypes, ProjectActions} from '../actions/project.actions';

export interface ReducerProjectState {
  projects: IProject[];
  numberOfImagesToUpload: number;
  numberOfUploadedImages: number;
}

export const initialProjectState: ReducerProjectState = {
  projects: [],
  numberOfImagesToUpload: undefined,
  numberOfUploadedImages: undefined
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
        numberOfUploadedImages: state.numberOfImagesToUpload
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
        numberOfUploadedImages: state.numberOfImagesToUpload
      };
    }
    case ActionTypes.GetProjects: {
      const tempActions: IProject[] = [];

      // state.projects.forEach(value => tempActions.push(value));
      action.payload.forEach(value => tempActions.push(value));
      return {
        projects: tempActions,
        numberOfImagesToUpload: state.numberOfImagesToUpload,
        numberOfUploadedImages: state.numberOfImagesToUpload
      };
    }
    default:
      return state;
  }
}
