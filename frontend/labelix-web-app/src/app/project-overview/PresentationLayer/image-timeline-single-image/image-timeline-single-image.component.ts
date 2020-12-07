import {Component, Input, OnInit} from '@angular/core';
import {IRawImage} from '../../../utility/contracts/IRawImage';

@Component({
  selector: 'app-image-timeline-single-image',
  templateUrl: './image-timeline-single-image.component.html',
  styleUrls: ['./image-timeline-single-image.component.css']
})
export class ImageTimelineSingleImageComponent implements OnInit {

  constructor() {
  }

  @Input()
  myImage: IRawImage;

  ngOnInit(): void {
  }
}
