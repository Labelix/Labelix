import {Component, OnInit} from '@angular/core';
import {LabelCategoryFacade} from '../../AbstractionLayer/LabelCategoryFacade';
import {ICategory} from '../../../utility/contracts/ICategory';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {AnnotaionMode} from '../../CoreLayer/annotaionModeEnum';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-label-widget',
  templateUrl: './label-widget.component.html',
  styleUrls: ['./label-widget.component.css']
})
export class LabelWidgetComponent implements OnInit {

  currentLabelCategories: ICategory[] = [];
  currentAnnotationMode: AnnotaionMode;
  selectedCategoryLabel: ICategory;

  currentlyAdding = false;

  newLabelName: string;
  newSupercategory: string;
  numExistingLabels: number;

  constructor(private facade: LabelCategoryFacade, private annotationFacade: AnnotationFacade,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.facade.labelCategories$.subscribe(value => this.currentLabelCategories = value);
    this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value);
    this.facade.numberOfExistingLabels$.subscribe(value => this.numExistingLabels = value);
    this.annotationFacade.activeLabel.subscribe(value => this.selectedCategoryLabel = value);
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
    this.annotationFacade.changeActiveLabel(item);
    // wenn nur das ganze Bild annotiert werden soll, kann sofort die Kategorie aktualisiert werden
    if (this.currentAnnotationMode === AnnotaionMode.WHOLE_IMAGE) {
      this.annotationFacade.changeCurrentAnnotationCategory(item);
    }
    this.openSnackBar(item.name);
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action ? action : undefined, {
      verticalPosition: 'bottom', horizontalPosition: 'start'
    });
  }

}
