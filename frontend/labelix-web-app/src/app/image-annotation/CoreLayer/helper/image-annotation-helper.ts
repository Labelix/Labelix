// TODO relocate this in the future
export class ImageAnnotationHelper {
  static getRandomColor(): string{
    return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
  }
}


