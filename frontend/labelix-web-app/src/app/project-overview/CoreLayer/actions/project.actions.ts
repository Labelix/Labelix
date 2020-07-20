import {Action} from '@ngrx/store';
import {IProject} from '../../../utility/contracts/IProject';

export enum ActionTypes {
  AddProject = '[Project] Add Projects'
}

export class AddProjectAction implements Action {
  readonly type = ActionTypes.AddProject;

  constructor(public payload: IProject) {
  }
}

export type ProjectActions =
  | AddProjectAction;
