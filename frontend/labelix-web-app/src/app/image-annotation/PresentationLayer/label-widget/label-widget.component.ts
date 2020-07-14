import {Component, OnInit} from '@angular/core';
import {LabelCategoryFacade} from '../../AbstractionLayer/LabelCategoryFacade';
import {ICategory} from '../../../utility/contracts/ICategory';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {AnnotaionMode} from '../../CoreLayer/annotaionModeEnum';

@Component({
  selector: 'app-label-widget',
  templateUrl: './label-widget.component.html',
  styleUrls: ['./label-widget.component.css']
})
export class LabelWidgetComponent implements OnInit {

  currentLabelCategories: ICategory[] = [];
  currentAnnotationMode: AnnotaionMode;

  currentlyAdding = false;

  newLabelName: string;
  newSupercategory: string;

  constructor(private facade: LabelCategoryFacade, private annotationFacade: AnnotationFacade) {
  }

  ngOnInit(): void {
    this.facade.labelCategories$.subscribe(value => this.currentLabelCategories = value);
    this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value);
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

  onLabelClick(item: ICategory) {
    if (this.currentAnnotationMode == AnnotaionMode.WHOLE_IMAGE) {
      this.annotationFacade.changeCurrentAnnotationCategory(item);
    }
  }

}
