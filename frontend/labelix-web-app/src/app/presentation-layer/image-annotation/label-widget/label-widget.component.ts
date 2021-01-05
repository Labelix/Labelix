import {Component, OnInit} from '@angular/core';
import {LabelCategoryFacade} from '../../../abstraction-layer/LabelCategoryFacade';
import {ICategory} from '../../../core-layer/utility/contracts/ICategory';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {AnnotationMode} from '../../../core-layer/utility/annotaionModeEnum';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ImageAnnotationHelper} from '../../../core-layer/helper/image-annotation-helper';
import {SingleAnnotationExportFormComponent} from '../single-annotation-export-form/single-annotation-export-form.component';
import {LabelSettingsDialogComponent} from '../label-settings-dialog/label-settings-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-label-widget',
  templateUrl: './label-widget.component.html',
  styleUrls: ['./label-widget.component.css']
})
export class LabelWidgetComponent implements OnInit {

  currentLabelCategories: ICategory[] = [];
  currentAnnotationMode: AnnotationMode;
  selectedCategoryLabel: ICategory;

  currentlyAdding = false;

  newLabelName: string;
  newSupercategory: string;
  numExistingLabels: number;

  nextLabelId: number;

  constructor(private facade: LabelCategoryFacade,
              private annotationFacade: AnnotationFacade,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.facade.labelCategories$.subscribe(value => this.currentLabelCategories = value);
    this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value);
    this.facade.numberOfExistingLabels$.subscribe(value => this.numExistingLabels = value);
    this.annotationFacade.activeLabel.subscribe(value => this.selectedCategoryLabel = value);
    this.facade.nextLabelId$.subscribe(value => this.nextLabelId = value);
  }

  onAddLabel() {
    this.currentlyAdding = true;
  }

  onSettings() {
    this.dialog.open(LabelSettingsDialogComponent);
  }

  onLabelClick(item: ICategory) {
    this.annotationFacade.changeActiveLabel(item);
    // wenn nur das ganze Bild annotiert werden soll, kann sofort eine Annotierung für das gesamte Bild gespeichert
    // werden
    if (this.currentAnnotationMode === AnnotationMode.WHOLE_IMAGE) {
      this.annotationFacade.addWholeImageAnnotation(this.selectedCategoryLabel);
    }
  }

}
