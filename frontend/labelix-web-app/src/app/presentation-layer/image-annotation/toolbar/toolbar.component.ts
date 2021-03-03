import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {AnnotationMode} from '../../../core-layer/utility/annotation-mode-enum';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  currentAnnotationMode: AnnotationMode;

  constructor(private annotationFacade: AnnotationFacade) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clickToolbarItem(input: number) {
    if (input === 0) {
      this.annotationFacade.changeCurrentAnnotationMode(AnnotationMode.WHOLE_IMAGE);
    } else if (input === 1) {
      this.annotationFacade.changeCurrentAnnotationMode(AnnotationMode.BOUNDING_BOXES);
    } else if (input === 2){
      this.annotationFacade.changeCurrentAnnotationMode(AnnotationMode.POLYGON);
    } else {
      this.annotationFacade.changeCurrentAnnotationMode(AnnotationMode.SIZING_TOOL);
    }
  }
}
