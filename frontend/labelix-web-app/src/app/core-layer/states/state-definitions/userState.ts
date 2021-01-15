import {ReducerUserState, userReducer} from '../reducers/reducerUserState';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export const featureStateName = 'userFeature';

export interface UserState {
  user: ReducerUserState;
}

export const userReducers: ActionReducerMap<UserState> = {
  user: userReducer,
};

export const getUserState = createFeatureSelector<UserState>(
  featureStateName
);

// Methods to subscribe to

export const getAllUsers = createSelector(
  getUserState,
  (state: UserState) => state.user.users
);
