/// <reference lib="webworker" />

import {BitMapController} from './BitMapController';
// Web Worker funktionieren in diesem Fall nicht richtig
// addEventListener('message', ({ data }) => {
//   for (let i = 1; i <= data.width; i++) {
//     for (let j = 1; j <= data.height; j++) {
//       const pixelData = data.getContext('2d').getImageData(i, j, 1, 1).data;
//       console.log(pixelData);
//     }
//   }
// });
