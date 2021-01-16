import {IUser} from '../../contracts/IUser';
import {ActionTypes, UserActions} from '../actions/user.actions';

export interface ReducerUserState {
  users: IUser[];
}

export const initialUserState: ReducerUserState = {
  users: [],
};

export function userReducer(state = initialUserState,
                            action: UserActions): ReducerUserState {

  switch (action.type) {
    case ActionTypes.AddUsers: {
      const tempUsers: IUser[] = [];

      state.users.forEach(value => tempUsers.push(value));
      action.payload.forEach(value => tempUsers.push(value));

      return {
        users: tempUsers
      };
    }

    case ActionTypes.ClearUsers: {
      return {
        users: []
      };
    }

    default:
      return state;
  }

}
