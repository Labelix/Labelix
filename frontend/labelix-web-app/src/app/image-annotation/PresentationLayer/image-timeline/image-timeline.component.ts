import {Component, OnInit} from '@angular/core';
import {RawImageFacade} from '../../AbstractionLayer/RawImageFacade';
import {IRawImage} from '../../../utility/contracts/IRawImage';

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
    this.rawImageFacade.files$.subscribe(value => this.listOfRawImages = value);

    for (const item of this.listOfRawImages) {
      const reader = new FileReader();
      console.log(item.name);
      reader.addEventListener('load', (event: any) => {
        this.rawImageFacade.addBase64CodeToIFile({
          id: item.id,
          baseCode: event.target.result
        });
      });
      reader.readAsDataURL(item.file);
    }
  }

}
