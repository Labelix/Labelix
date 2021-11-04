import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICategory} from '../../../core-layer/contracts/ICategory';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-selected-label-widget',
  templateUrl: './selected-label-widget.component.html',
  styleUrls: ['./selected-label-widget.component.css']
})
export class SelectedLabelWidgetComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  selectedCategoryLabel: ICategory | undefined;

  constructor(private annotationFacade: AnnotationFacade) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.annotationFacade.activeLabel.subscribe(value => this.selectedCategoryLabel = value));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
