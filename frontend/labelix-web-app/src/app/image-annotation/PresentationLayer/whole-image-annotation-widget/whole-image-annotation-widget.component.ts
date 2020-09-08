import {Component, OnInit} from '@angular/core';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {IImageAnnotation} from '../../../utility/contracts/IImageAnnotation';
import {AnnotaionMode} from '../../CoreLayer/annotaionModeEnum';
import {DeleteImageAnnotationDialogComponent} from '../delete-image-annotation-dialog/delete-image-annotation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {IFile} from '../../../utility/contracts/IFile';

@Component({
  selector: 'app-whole-image-annotation-widget',
  templateUrl: './whole-image-annotation-widget.component.html',
  styleUrls: ['./whole-image-annotation-widget.component.css']
})
export class WholeImageAnnotationWidgetComponent implements OnInit {

  constructor(private facade: AnnotationFacade, private dialog: MatDialog) {
  }

  currentImageAnnotations: IImageAnnotation[];
  activeImage: IFile;

  ngOnInit(): void {
    this.facade.currentImageAnnotations.subscribe(value => this.currentImageAnnotations = value);
    this.facade.currentAnnotationImage.subscribe(value => this.activeImage = value);
  }

  getRightIcon(mode: AnnotaionMode): string {
    if (mode === AnnotaionMode.WHOLE_IMAGE) {
      return 'format_color_text';
    } else if (mode === AnnotaionMode.BOUNDING_BOXES){
      return 'crop_din';
    } else {
      return 'create';
    }
  }

  onDeleteImageAnnotation(item: IImageAnnotation) {
    const dialogRef = this.dialog.open(DeleteImageAnnotationDialogComponent, {data: {annotation: item}});
  }

}
