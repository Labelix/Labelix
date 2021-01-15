import {Action} from '@ngrx/store';
import {IUser} from '../utility/contracts/IUser';

export enum ActionTypes {
  ClearUsers = '[User] Clear users list',
  AddUsers = '[User] Add users as a list'
}

export class ClearUsers implements Action {
  readonly type = ActionTypes.ClearUsers;

  constructor() {
  }
}

export class AddUsers implements Action {
  readonly type = ActionTypes.AddUsers;

  constructor(public payload: IUser[]) {
  }
}

export type UserActions =
  | ClearUsers
  | AddUsers;
