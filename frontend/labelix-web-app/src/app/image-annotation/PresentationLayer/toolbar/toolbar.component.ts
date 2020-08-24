import {Component, OnInit} from '@angular/core';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {AnnotaionMode} from '../../CoreLayer/annotaionModeEnum';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private annotationFacade: AnnotationFacade) {
  }

  currentAnnotationMode: AnnotaionMode;

  ngOnInit(): void {
    this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value);
    this.annotationFacade.currentAnnotationMode.subscribe(value => console.log(value));
  }

  clickToolbarItem(input: number) {
    if (input === 0) {
      this.annotationFacade.changeCurrentAnnotationMode(AnnotaionMode.WHOLE_IMAGE);
    } else if (input === 1) {
      this.annotationFacade.changeCurrentAnnotationMode(AnnotaionMode.BOUNDING_BOXES);
    } else if (input === 2){
      this.annotationFacade.changeCurrentAnnotationMode(AnnotaionMode.POLYGON);
    } else {
      this.annotationFacade.changeCurrentAnnotationMode(AnnotaionMode.SIZING_TOOL);
    }
  }
}
