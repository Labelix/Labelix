import {IImageAnnotation} from '../../contracts/IImageAnnotation';
import {Buffer} from 'buffer';
import {IImage} from '../../contracts/IImage';
import {IRawImage} from '../../contracts/IRawImage';
import {AnnotaionMode} from '../../../image-annotation/CoreLayer/annotaionModeEnum';
import {ICategory} from '../../contracts/ICategory';

export class BitmaskCocoConverter {

  private listOfCoordinates: { x: number, y: number }[] = [];

  convertBase64ToAnnotation(input: IImage, rawImage: IRawImage, category: ICategory): IImageAnnotation {

    const myBuffer = Buffer.from(input.Data, 'base64');
    const field = this.get2DimensionalArrayFrommBuffer(myBuffer, input.width, input.height);
    console.log(field);
    const beginning = this.findBeginning(field, input.width, input.height);

    // recursive function
    this.searchForBorderPixelAndSaveThem(field, beginning);

    // TODO find solution for ID, AREA and ISCROWD fields
    return {
      id: -1,
      annotationMode: AnnotaionMode.POLYGON,
      area: -1,
      boundingBox: undefined,
      categoryLabel: category,
      image: rawImage,
      isCrowd: false,
      isVisible: true,
      segmentations: this.createSegmentationList(this.listOfCoordinates)
    };
  }

  private createSegmentationList(coordinates: { x: number, y: number }[]): number[] {
    const result: number[] = [];

    for (let i = 0; i < coordinates.length; i++) {
      // wenn man den zweiten Wert bei der Modulo-Operation verändert,
      // kann man anpassen, ob und wie viele werte übersprungen werden
      if (i % 1 === 0) {
        result.push(coordinates[i].x);
        result.push(coordinates[i].y);
      }
    }

    return result;
  }

  private searchForBorderPixelAndSaveThem(field, coordinates: { x: number, y: number }): boolean {

    if (!this.checkIfAlreadyBeenHere(coordinates)
      && this.isInBounds(field, coordinates)
      && field[coordinates.x][coordinates.y] === 1
      && this.checkIfAtLeastOneNeighbourIsZero(field, coordinates)) {

      this.listOfCoordinates.push(coordinates);

      for (let i = coordinates.x - 1; i < coordinates.x + 1; i++) {
        for (let j = coordinates.y - 1; j < coordinates.y + 1; j++) {
          if (this.isInBounds(field, {x: i, y: j}) && !(coordinates.x === i && coordinates.y === j)) {
            this.searchForBorderPixelAndSaveThem(field, {x: i, y: j});
          }
        }
      }

      return true;
    } else {
      return false;
    }
  }

  private checkIfAlreadyBeenHere(coordinates: { x: number, y: number }): boolean {
    for (const alreadyChecked of this.listOfCoordinates) {
      if (alreadyChecked.x === coordinates.x && alreadyChecked.y === coordinates.y) {
        return true;
      }
    }
    return false;
  }

  private checkIfAtLeastOneNeighbourIsZero(field, coordinates): boolean {
    for (let i = coordinates.x - 1; i < coordinates.x + 1; i++) {
      for (let j = coordinates.y - 1; j < coordinates.y + 1; j++) {
        if (this.isInBounds(field, {x: i, y: j}) && field[i][j] === 0) {
          return true;
        }
      }
    }
    return false;
  }

  private isInBounds(field, coordinates: { x: number, y: number }): boolean {
    return coordinates.x >= 0 && coordinates.x < field[0].length && coordinates.y >= 0 && coordinates.y < field[0][0].length;
  }

  private findBeginning(field: number[][], width: number, height: number): { x: number, y: number } {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (field[i][j] === 1) {
          return {x: i, y: j};
        }
      }
    }
    return {x: 0, y: 0};
  }

  private get2DimensionalArrayFrommBuffer(buffer: Buffer, width: number, height: number): number[][] {
    const result = new Array(height);
    for (let i = 0; i < height; i++) {
      result[i] = new Array();
    }

    let row = -1;
    let column = 0;

    for (let i = 0; i < buffer.length; i++) {
      if (i % width === 0) {
        row++;
        column = 0;
      }

      result[row][column] = buffer[i];

      column++;
    }

    return result;
  }
}
