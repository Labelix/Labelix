import {Component, OnDestroy, OnInit} from '@angular/core';
import {LabelCategoryFacade} from '../../../abstraction-layer/LabelCategoryFacade';
import {ICategory} from '../../../core-layer/contracts/ICategory';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {AnnotationMode} from '../../../core-layer/utility/annotaionModeEnum';
import {LabelSettingsDialogComponent} from '../label-settings-dialog/label-settings-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {AddLabelDialogComponent} from '../add-label-dialog/add-label-dialog.component';

@Component({
  selector: 'app-label-widget',
  templateUrl: './label-widget.component.html',
  styleUrls: ['./label-widget.component.css']
})
export class LabelWidgetComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  currentLabelCategories: ICategory[] = [];
  currentAnnotationMode: AnnotationMode;
  selectedCategoryLabel: ICategory;

  currentlyAdding = false;

  numExistingLabels: number;

  nextLabelId: number;

  constructor(private facade: LabelCategoryFacade,
              private annotationFacade: AnnotationFacade,
              public dialog: MatDialog) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.facade.labelCategories$.subscribe(value => this.currentLabelCategories = value));
    this.subscription.add(this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value));
    this.subscription.add(this.facade.numberOfExistingLabels$.subscribe(value => this.numExistingLabels = value));
    this.subscription.add(this.annotationFacade.activeLabel.subscribe(value => this.selectedCategoryLabel = value));
    this.subscription.add(this.facade.nextLabelId$.subscribe(value => this.nextLabelId = value));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddLabel() {
    this.currentlyAdding = true;
  }

  onAddLabelClick() {
    this.dialog.open(AddLabelDialogComponent);
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
