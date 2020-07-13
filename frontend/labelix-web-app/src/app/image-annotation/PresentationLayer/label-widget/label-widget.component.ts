import { Component, OnInit } from '@angular/core';
import {LabelCategoryFacade} from '../../AbstractionLayer/LabelCategoryFacade';
import {ICategory} from '../../../utility/contracts/ICategory';

@Component({
  selector: 'app-label-widget',
  templateUrl: './label-widget.component.html',
  styleUrls: ['./label-widget.component.css']
})
export class LabelWidgetComponent implements OnInit {

  currentLabelCategories: ICategory[] = [];

  currentlyAdding = false;

  newLabelName: string;
  newSupercategory: string;

  constructor(private facade: LabelCategoryFacade) { }

  ngOnInit(): void {
    this.currentLabelCategories.push({
      id: -1,
      name: 'test',
      supercategory: 'testus'
    });
    this.facade.labelCategories$.subscribe(value => this.currentLabelCategories = value);
  }

  onAddLabel() {
    this.currentlyAdding = true;
  }

  onSave(){

    this.currentlyAdding = false;
  }

}
