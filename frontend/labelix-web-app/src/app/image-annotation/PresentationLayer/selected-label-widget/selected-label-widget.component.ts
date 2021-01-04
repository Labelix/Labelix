import { Component, OnInit } from '@angular/core';
import {ICategory} from '../../../utility/contracts/ICategory';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';

@Component({
  selector: 'app-selected-label-widget',
  templateUrl: './selected-label-widget.component.html',
  styleUrls: ['./selected-label-widget.component.css']
})
export class SelectedLabelWidgetComponent implements OnInit {

  selectedCategoryLabel: ICategory;

  constructor(private annotationFacade: AnnotationFacade) { }

  ngOnInit(): void {
    this.annotationFacade.activeLabel.subscribe(value => this.selectedCategoryLabel = value);
  }

}
