import {Action} from '@ngrx/store';
import {IProject} from '../../contracts/IProject';

export enum ActionTypes {
  AddProject = '[Project] Add Projects',
  DeleteProject = '[Project] Delete Projects',
  GetProjects = '[Project] Get Projects',
  SetNumberOfImagesToUpload = '[Project] Set Images to upload on a project',
  IncreaseNumberOfUploadedImages = '[Project] Increase number of uploaded images on state',
  ClearUploadInformation = '[Project] Clear both upload information variables'
}

export class AddProjectAction implements Action {
  readonly type = ActionTypes.AddProject;

  constructor(public payload: IProject) {
  }
}

export class DeleteProjectAction implements Action {
  readonly type = ActionTypes.DeleteProject;

  constructor(public payload: IProject) {
  }
}

export class GetProjectsAction implements Action {
  readonly type = ActionTypes.GetProjects;

  constructor(public payload: IProject[]) {
  }
}

export class SetNumberOfImagesToUploadAction implements Action {
  readonly type = ActionTypes.SetNumberOfImagesToUpload;

  constructor(public payload: number) {
  }
}

export class IncreaseNumberOfUploadedImages implements Action {
  readonly type = ActionTypes.IncreaseNumberOfUploadedImages;

  constructor() {
  }
}

export class ClearUploadInformation implements Action {
  readonly type = ActionTypes.ClearUploadInformation;

  constructor() {
  }
}

export type ProjectActions =
  | AddProjectAction
  | DeleteProjectAction
  | GetProjectsAction
  | SetNumberOfImagesToUploadAction
  | IncreaseNumberOfUploadedImages
  | ClearUploadInformation;
