import {Component, OnInit} from '@angular/core';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {IImageAnnotation} from '../../../utility/contracts/IImageAnnotation';

@Component({
  selector: 'app-whole-image-annotation-widget',
  templateUrl: './whole-image-annotation-widget.component.html',
  styleUrls: ['./whole-image-annotation-widget.component.css']
})
export class WholeImageAnnotationWidgetComponent implements OnInit {

  constructor(private facade: AnnotationFacade) {
  }

  currentImageAnnotations: IImageAnnotation[];

  ngOnInit(): void {
    this.facade.currentImageAnnotations.subscribe(value => this.currentImageAnnotations = value);
  }

}
