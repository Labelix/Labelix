import {Component, OnInit} from '@angular/core';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {IRawImage} from '../../../core-layer/utility/contracts/IRawImage';

@Component({
  selector: 'app-image-timeline',
  templateUrl: './image-timeline.component.html',
  styleUrls: ['./image-timeline.component.css']
})
export class ImageTimelineComponent implements OnInit {

  constructor(private rawImageFacade: RawImageFacade) {
  }

  listOfRawImages: IRawImage[];

  ngOnInit(): void {
    this.rawImageFacade.rawImages$.subscribe(value => {
      this.listOfRawImages = value;
      for (const item of this.listOfRawImages) {
        if (item.base64Url === undefined || item.base64Url === '') {
          this.getBase64(item);
        }
      }
    });
  }

  private getBase64(item: IRawImage) {
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.rawImageFacade.addBase64CodeToRawImageOnState({
        id: item.id,
        baseCode: event.target.result
      });
    });
    reader.readAsDataURL(item.file);
  }
}
