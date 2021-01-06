import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IRawImage} from '../../../core-layer/utility/contracts/IRawImage';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  rawImages: IRawImage[] = [];

  @ViewChild('fileDropRef', {static: false}) fileDropEl: ElementRef;

  constructor(private rawImageFacade: RawImageFacade) {
    this.rawImageFacade.rawImages$.subscribe((m) => this.rawImages = m);
  }

  ngOnInit(): void {
  }

  onFileDropped($event) {
    for (const item of $event) {
      const reader = new FileReader();
      const image = new Image();
      reader.addEventListener('load', (event: any) => {
        image.src = event.target.result;
        image.onload = () => {
          this.rawImageFacade.addRawImageToState({
            id: -1,
            file: item,
            height: image.height,
            width: image.width,
            base64Url: image.src,
            name: item.name
          });
        };
      });
      reader.readAsDataURL(item);
    }

  }
}
