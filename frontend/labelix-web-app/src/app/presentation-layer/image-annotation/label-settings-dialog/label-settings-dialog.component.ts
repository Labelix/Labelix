import {Component, OnInit} from '@angular/core';
import {LabelCategoryFacade} from '../../../abstraction-layer/LabelCategoryFacade';
import {ICategory} from '../../../core-layer/utility/contracts/ICategory';
import {ImageAnnotationHelper} from '../../../core-layer/helper/image-annotation-helper';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {IImageAnnotation} from '../../../core-layer/utility/contracts/IImageAnnotation';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-label-settings-dialog',
  templateUrl: './label-settings-dialog.component.html',
  styleUrls: ['./label-settings-dialog.component.css']
})
export class LabelSettingsDialogComponent implements OnInit {

  currentLabelCategories: ICategory[];
  imageAnnotations: IImageAnnotation[];
  selectedLabel: LocalLabel;
  nextLabelId: number;
  firstInit = true;

  newLabelName: string;
  newSupercategory: string;

  constructor(private labelFacade: LabelCategoryFacade,
              private annotationFacade: AnnotationFacade,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.labelFacade.labelCategories$.subscribe(value => {

      this.currentLabelCategories = value;
      if (this.firstInit) {
        this.copyProperties(this.currentLabelCategories[0]);
        this.firstInit = false;
      }

    });

    this.labelFacade.nextLabelId$.subscribe(value => this.nextLabelId = value);
    this.annotationFacade.currentImageAnnotations.subscribe(value => this.imageAnnotations = value);

  }

  copyProperties(other: ICategory) {
    this.selectedLabel = {
      colorCode: other.colorCode,
      name: other.name,
      supercategory: other.supercategory,
      id: other.id
    };
  }

  formatLabel(value: number) {
    if (this.selectedLabel !== undefined) {
      this.selectedLabel.colorCode = ImageAnnotationHelper.getHSLColor(value);
      console.log(value);
    }
    return value;
  }

  updateCategory() {
    this.labelFacade.updateCategory(this.selectedLabel);
    this.annotationFacade.changeActiveLabel(undefined);
    this.annotationFacade.updateCategoryOnAnnotations(this.selectedLabel);
  }

  deleteCategory() {
    let deletable = true;
    this.imageAnnotations.forEach(value => {
      if (value.categoryLabel.id === this.selectedLabel.id) {
        deletable = false;
      }
    });
    const message = 'Prüfen Sie ob noch Annotierungen dieses Labels existieren';
    deletable ? this.labelFacade.deleteCategory(this.selectedLabel.id) : this.snackBar.open(message, 'ok', {duration: 5000});
  }

  onSave() {
    this.labelFacade.addLabelCategory({
      name: this.newLabelName,
      supercategory: this.newSupercategory,
      id: this.nextLabelId,
      colorCode: ImageAnnotationHelper.getRandomColor()
    });
    this.newLabelName = '';
    this.newSupercategory = '';
  }

  getColor(value) {
    console.log(value);
    this.selectedLabel = {
      colorCode: value.color.hex,
      id: this.selectedLabel.id,
      name: this.selectedLabel.name,
      supercategory: this.selectedLabel.supercategory
    };
  }

}

class LocalLabel implements ICategory {
  colorCode: string;
  id: number;
  name: string;
  supercategory: string;
}
