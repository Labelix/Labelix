import {Component, OnInit} from '@angular/core';
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

  constructor(private facade: LabelCategoryFacade) {
  }

  ngOnInit(): void {
    this.facade.labelCategories$.subscribe(value => this.currentLabelCategories = value);
  }

  onAddLabel() {
    this.currentlyAdding = true;
  }

  onSave() {
    this.facade.addLabelCategory({
      name: this.newLabelName,
      supercategory: this.newSupercategory,
      id: -1,
      colorCode: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
    });
    this.newLabelName = '';
    this.newSupercategory = '';
    this.currentlyAdding = false;
  }

}
