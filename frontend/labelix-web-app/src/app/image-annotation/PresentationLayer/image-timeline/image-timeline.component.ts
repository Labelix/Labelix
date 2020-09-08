import {Component, OnInit} from '@angular/core';
import {RawImageFacade} from '../../AbstractionLayer/RawImageFacade';
import {IFile} from '../../../utility/contracts/IFile';

@Component({
  selector: 'app-image-timeline',
  templateUrl: './image-timeline.component.html',
  styleUrls: ['./image-timeline.component.css']
})
export class ImageTimelineComponent implements OnInit {

  constructor(private rawImageFacade: RawImageFacade) {
  }

  listOfRawImages: IFile[];

  ngOnInit(): void {
    this.rawImageFacade.files$.subscribe(value => this.listOfRawImages = value);

    for (const item of this.listOfRawImages) {
      const reader = new FileReader();
      console.log(item.file.name);
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
