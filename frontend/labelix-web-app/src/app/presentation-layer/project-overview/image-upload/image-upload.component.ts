import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IRawImage} from '../../../core-layer/contracts/IRawImage';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  rawImages: IRawImage[] = [];

  @ViewChild('fileDropRef', {static: false}) fileDropEl: ElementRef;

  constructor(private rawImageFacade: RawImageFacade) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.rawImageFacade.rawImages$.subscribe((m) => this.rawImages = m));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
