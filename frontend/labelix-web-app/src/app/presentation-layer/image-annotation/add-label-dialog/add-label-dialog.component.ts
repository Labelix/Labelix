import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImageAnnotationHelper} from '../../../core-layer/utility/helper/image-annotation-helper';
import {LabelCategoryFacade} from '../../../abstraction-layer/LabelCategoryFacade';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {ICategory} from '../../../core-layer/contracts/ICategory';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-label-dialog',
  templateUrl: './add-label-dialog.component.html',
  styleUrls: ['./add-label-dialog.component.css']
})
export class AddLabelDialogComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  newLabelName: string;
  newSupercategory: string;

  nextLabelId: number;
  allCategories: ICategory[];

  formGroup: FormGroup;

  constructor(private labelFacade: LabelCategoryFacade,
              public dialogRef: MatDialogRef<AddLabelDialogComponent>,
              private snackBar: MatSnackBar) {
    this.subscription = new Subscription();

    this.formGroup = new FormGroup({
      category: new FormControl('', [Validators.required]),
      supercategory: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.subscription.add(this.labelFacade.nextLabelId$.subscribe(value => this.nextLabelId = value));
    this.subscription.add(this.labelFacade.labelCategories$.subscribe(value => this.allCategories = value));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSave() {
    if (!this.labelFacade.checkIfNameIsAlreadyPresent(this.newLabelName, this.allCategories)) {
      this.labelFacade.addLabelCategory({
        name: this.newLabelName,
        supercategory: this.newSupercategory,
        id: this.nextLabelId,
        colorCode: ImageAnnotationHelper.getRandomColor()
      });
      this.newLabelName = '';
      this.newSupercategory = '';
      this.dialogRef.close();
    } else {
      this.snackBar.open('Seems like a category with this name is already present', 'ok', {duration: 5000});
    }
  }

}
