import {IIdentifiable} from './IIdentifiable';

export interface IUser extends IIdentifiable {
  keycloakId: string;
}
