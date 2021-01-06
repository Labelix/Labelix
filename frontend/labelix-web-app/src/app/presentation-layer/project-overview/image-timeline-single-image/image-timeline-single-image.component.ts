import {Component, Input, OnInit} from '@angular/core';
import {IRawImage} from '../../../core-layer/utility/contracts/IRawImage';
import {ProjectImageUploadFacade} from '../../../abstraction-layer/ProjectImageUploadFacade';

@Component({
  selector: 'app-image-timeline-single-image',
  templateUrl: './image-timeline-single-image.component.html',
  styleUrls: ['./image-timeline-single-image.component.css']
})
export class ImageTimelineSingleImageComponent implements OnInit {

  constructor(private rawImageFacade: ProjectImageUploadFacade) {
  }

  @Input()
  myImage: IRawImage;

  ngOnInit(): void {
  }
  onImageClick(){
    this.rawImageFacade.deleteImage(this.myImage);
  }
}
