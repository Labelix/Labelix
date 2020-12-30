import {IIdentifiable} from './IIdentifiable';

export interface IData extends IIdentifiable {
  // is the base64 string
  Data: string;
  imageId: number;
  projectId: number;
  format: string;
  name: string;
  // die Höhe und die Breite des Bildes braucht man hier, um die Response vom AI Backend richtig
  // auszulesen ansonsten kann man diese werte ignorieren und bzw auf -1 stellen
  width: number;
  height: number;
}
