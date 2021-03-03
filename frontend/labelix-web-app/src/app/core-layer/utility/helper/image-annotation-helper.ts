// TODO relocate this in the future
import {Color} from 'angular2-hsl-color-picker';

export class ImageAnnotationHelper {

  static getRandomColor(): string {
    // return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
    return Color.fromHSL(Math.random() * 360, 100, 50).toString();
  }

  static getHSLColor(h: number): string {
    return Color.fromHSL(h, 100, 50).toString();
  }

}


