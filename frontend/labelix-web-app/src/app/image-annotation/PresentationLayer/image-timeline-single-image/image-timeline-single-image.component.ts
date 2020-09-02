import {Component, Input, OnInit} from '@angular/core';
import {IFile} from '../../../utility/contracts/IFile';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';

@Component({
  selector: 'app-image-timeline-single-image',
  templateUrl: './image-timeline-single-image.component.html',
  styleUrls: ['./image-timeline-single-image.component.css']
})
export class ImageTimelineSingleImageComponent implements OnInit {

  constructor(private annotationFacade: AnnotationFacade) {
  }

  @Input()
  myImage: IFile;

  ngOnInit(): void {
  }

  onImageClick() {
    console.log('test');
    this.annotationFacade.changeCurrentAnnotationImage(this.myImage);
  }
}
