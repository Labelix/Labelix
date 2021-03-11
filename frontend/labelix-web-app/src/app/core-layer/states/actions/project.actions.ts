import {Action} from '@ngrx/store';
import {IProject} from '../../contracts/IProject';

export enum ActionTypes {
  AddProject = '[Project] Add Projects',
  DeleteProject = '[Project] Delete Projects',
  GetProjects = '[Project] Get Projects',
  SetNameOfUploadProject = '[Project] set name of uploading project to recognise which project should not be displayed',
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

export class IncreaseNumberOfUploadedImagesAction implements Action {
  readonly type = ActionTypes.IncreaseNumberOfUploadedImages;

  constructor() {
  }
}

export class ClearUploadInformationAction implements Action {
  readonly type = ActionTypes.ClearUploadInformation;

  constructor() {
  }
}

export class SetNameOfUploadProjectAction implements Action {
  readonly type = ActionTypes.SetNameOfUploadProject;

  constructor(public payload: string) {
  }
}

export type ProjectActions =
  | AddProjectAction
  | DeleteProjectAction
  | GetProjectsAction
  | SetNumberOfImagesToUploadAction
  | IncreaseNumberOfUploadedImagesAction
  | ClearUploadInformationAction
  | SetNameOfUploadProjectAction;
