export class BitMapController {
  base64ToCoco(name: string, base64: string): string {

    const image = new Image();
    image.src = base64;
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
    for (let i = 1; i <= image.width; i++) {
      for (let j = 1; j <= image.height; j++) {
        const pixelData = canvas.getContext('2d').getImageData(i, j, 1, 1).data;
        console.log(pixelData);
      }
    }

    return 'coco result';
  }
}
