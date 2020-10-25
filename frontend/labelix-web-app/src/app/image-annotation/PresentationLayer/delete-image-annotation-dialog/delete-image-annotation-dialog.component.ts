import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';

@Component({
  selector: 'app-delete-image-annotation-dialog',
  templateUrl: './delete-image-annotation-dialog.component.html',
  styleUrls: ['./delete-image-annotation-dialog.component.css']
})
export class DeleteImageAnnotationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteImageAnnotationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private facade: AnnotationFacade) {
  }

  ngOnInit(): void {
  }

  onAccept() {
    this.facade.deleteImageAnnotation(this.data.annotation);
    this.dialogRef.close();
  }

  onDecline() {
    this.dialogRef.close();
  }
}
