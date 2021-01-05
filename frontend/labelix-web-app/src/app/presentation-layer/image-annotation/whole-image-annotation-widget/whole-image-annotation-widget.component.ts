import {Component, OnInit} from '@angular/core';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {IImageAnnotation} from '../../../core-layer/utility/contracts/IImageAnnotation';
import {AnnotationMode} from '../../../core-layer/utility/annotaionModeEnum';
import {DeleteImageAnnotationDialogComponent} from '../delete-image-annotation-dialog/delete-image-annotation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {IRawImage} from '../../../core-layer/utility/contracts/IRawImage';

@Component({
  selector: 'app-whole-image-annotation-widget',
  templateUrl: './whole-image-annotation-widget.component.html',
  styleUrls: ['./whole-image-annotation-widget.component.css']
})
export class WholeImageAnnotationWidgetComponent implements OnInit {

  constructor(private facade: AnnotationFacade, private dialog: MatDialog) {
  }

  currentImageAnnotations: IImageAnnotation[];
  activeImage: IRawImage;

  ngOnInit(): void {
    this.facade.currentImageAnnotations.subscribe(value => this.currentImageAnnotations = value);
    this.facade.currentAnnotationImage.subscribe(value => this.activeImage = value);
  }

  getRightIcon(mode: AnnotationMode): string {
    if (mode === AnnotationMode.WHOLE_IMAGE) {
      return 'format_color_text';
    } else if (mode === AnnotationMode.BOUNDING_BOXES){
      return 'crop_din';
    } else {
      return 'create';
    }
  }

  onDeleteImageAnnotation(item: IImageAnnotation) {
    this.dialog.open(DeleteImageAnnotationDialogComponent, {data: {annotation: item}});
  }

  onChangeVisibility(item: IImageAnnotation) {
    this.facade.changeVisibilityOfImageAnnotation(item);
  }

}
