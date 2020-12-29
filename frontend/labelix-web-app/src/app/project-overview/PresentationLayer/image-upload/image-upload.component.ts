import { Component, OnInit } from '@angular/core';
import {IRawImage} from '../../../utility/contracts/IRawImage';
import {ProjectImageUploadFacade} from '../../AbstractionLayer/ProjectImageUploadFacade';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  rawImages: IRawImage[] = [];
  constructor(private rawImageFacade: ProjectImageUploadFacade) {
      this.rawImageFacade.rawImages$.subscribe((m) => this.rawImages = m);
  }

  ngOnInit(): void {
  }

  onFileDropped($event: any) {
    for (const item of $event) {
      const reader = new FileReader();
      const image = new Image();
      reader.addEventListener('load', (event: any) => {
        image.src = event.target.result;
        image.onload = () => {
          // tslint:disable-next-line:max-line-length
          this.rawImageFacade.postRawImage({id: -1, file: item, height: image.height, width: image.width, base64Url: image.src, name: item.name});
        };
      });
      reader.readAsDataURL(item);
    }

  }
}
