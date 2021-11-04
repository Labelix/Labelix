import {ReducerUserState, userReducer} from '../reducers/reducerUserState';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export const userStateName = 'userFeature';

export interface UserState {
  user: ReducerUserState;
}

export const userReducers: ActionReducerMap<UserState> = {
  // @ts-ignore
  user: userReducer,
};

export const getUserState = createFeatureSelector<UserState>(
  userStateName
);

// Methods to subscribe to

export const getAllUsers = createSelector(
  getUserState,
  (state: UserState) => state.user.users
);
