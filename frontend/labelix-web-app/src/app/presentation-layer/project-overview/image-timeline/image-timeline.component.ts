import {Component, OnDestroy, OnInit} from '@angular/core';
import {IRawImage} from '../../../core-layer/contracts/IRawImage';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-image-timeline',
  templateUrl: './image-timeline.component.html',
  styleUrls: ['./image-timeline.component.css']
})
export class ImageTimelineComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  listOfRawImages: IRawImage[];

  constructor(private rawImageFacade: RawImageFacade) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.rawImageFacade.rawImages$.subscribe(value => {
      this.listOfRawImages = value;
      for (const item of this.listOfRawImages) {
        if (item.base64Url === undefined || item.base64Url === '') {
          this.getBase64(item);
        }
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getBase64(item: IRawImage) {
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.rawImageFacade.addBase64CodeToRawImageOnState({
        id: item.id,
        baseCode: event.target.result
      });
    });
    reader.readAsDataURL(item.file!);
  }
}
