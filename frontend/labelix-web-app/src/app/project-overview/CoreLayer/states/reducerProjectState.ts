import {IProject} from '../../../utility/contracts/IProject';
import {ActionTypes, ProjectActions} from '../actions/project.actions';

export interface ReducerProjectState{
  project: IProject[];
}

export const initialProjectState: ReducerProjectState = {
  project: [],
};

export function projectReducer(
  state = initialProjectState,
  action: ProjectActions): ReducerProjectState {
    switch (action.type) {
      case ActionTypes.AddProject: {
        const tempActions: IProject[] = [];

        state.project.forEach(value => tempActions.push(value));
        action.payload.forEach(value => tempActions.push(value));

        return{
          project: tempActions
        };
      }
    }
}
