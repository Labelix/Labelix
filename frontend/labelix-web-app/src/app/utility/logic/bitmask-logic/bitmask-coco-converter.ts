import {IImageAnnotation} from '../../contracts/IImageAnnotation';
import {Buffer} from 'buffer';
import {IImage} from '../../contracts/IImage';

export class BitmaskCocoConverter {

  convertBase64ToAnnotation(input: IImage): IImageAnnotation {
    const myBuffer = Buffer.from(input.Data, 'base64');

    console.log(myBuffer);


    return null;
  }
}
