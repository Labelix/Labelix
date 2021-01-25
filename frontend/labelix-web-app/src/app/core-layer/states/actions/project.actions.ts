import {Action} from '@ngrx/store';
import {IProject} from '../../contracts/IProject';

export enum ActionTypes {
  AddProject = '[Project] Add Projects',
  DeleteProject = '[Project] Delete Projects',
  GetProjects = '[Project] Get Projects'
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

export type ProjectActions =
  | AddProjectAction
  | DeleteProjectAction
  | GetProjectsAction;
