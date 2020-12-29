import {Component, Input, OnInit} from '@angular/core';
import {IRawImage} from '../../../utility/contracts/IRawImage';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {BitmaskCocoConverter} from '../../../utility/logic/bitmask-logic/bitmask-coco-converter';

@Component({
  selector: 'app-image-timeline-single-image',
  templateUrl: './image-timeline-single-image.component.html',
  styleUrls: ['./image-timeline-single-image.component.css']
})
export class ImageTimelineSingleImageComponent implements OnInit {

  constructor(private annotationFacade: AnnotationFacade) {
  }

  @Input()
  myImage: IRawImage;

  ngOnInit(): void {
  }

  onImageClick() {
    this.annotationFacade.changeCurrentAnnotationImage(this.myImage);
  }
}
