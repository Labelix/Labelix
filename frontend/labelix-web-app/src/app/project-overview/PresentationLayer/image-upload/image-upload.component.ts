import { Component, OnInit } from '@angular/core';
import {IRawImage} from '../../../utility/contracts/IRawImage';
import {IImage} from '../../../utility/contracts/IImage';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFileDropped($event: any) {
    const tmp: IRawImage[] = [];

    let count = 1;
    for (const item of $event) {
      // base 64 encoding wird später hinzugefügt
      tmp.push({id: count, file: item, height: -1, width: -1, base64Url: '', name: item.name});
      count++;
    }
    const reader = new FileReader();
    const image = new Image();
    reader.addEventListener('load', (event: any) => {
      image.src = event.target.result;
      image.onload = () => {
        const newRawImage = {
          id: 0,
          file: tmp[0].file,
          width: image.width,
          height: image.height,
          base64Url: image.src,
          name: tmp[0].file.name
        };
      };
    });
    reader.readAsDataURL(tmp[0].file);
  }
}
