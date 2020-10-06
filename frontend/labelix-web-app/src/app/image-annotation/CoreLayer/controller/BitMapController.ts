export class BitMapController {
  base64ToCoco(name: string, base64: string): string {

    // webworker funktionieren leider nicht wie erwartet und ohne ist es nicht performant genug
    const worker = new Worker('./image-worker.worker', {type: 'module'});

    worker.onmessage = ({data}) => {
      console.log('finish: ' + data);
    };
    /*
        const image = new Image();
        image.src = base64;
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
        for (let i = 1; i <= canvas.width; i++) {
          for (let j = 1; j <= canvas.height; j++) {
            const pixelData = canvas.getContext('2d').getImageData(i, j, 1, 1).data;
            console.log(pixelData);
          }
        }

     */

    //  worker.postMessage({canvas});

    return 'coco result';
  }
}
