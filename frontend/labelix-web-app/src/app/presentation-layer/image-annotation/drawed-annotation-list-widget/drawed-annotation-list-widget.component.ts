import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {IImageAnnotation} from '../../../core-layer/contracts/IImageAnnotation';
import {AnnotationMode} from '../../../core-layer/utility/annotation-mode-enum';
import {DeleteImageAnnotationDialogComponent} from '../delete-image-annotation-dialog/delete-image-annotation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {IRawImage} from '../../../core-layer/contracts/IRawImage';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-drawed-annotation-list-widget',
  templateUrl: './drawed-annotation-list-widget.component.html',
  styleUrls: ['./drawed-annotation-list-widget.component.css']
})
export class DrawedAnnotationListWidgetComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  currentImageAnnotations: IImageAnnotation[];
  activeImage: IRawImage;

  constructor(private facade: AnnotationFacade, private dialog: MatDialog) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.facade.currentImageAnnotations.subscribe(value => this.currentImageAnnotations = value));
    this.subscription.add(this.facade.currentAnnotationImage.subscribe(value => this.activeImage = value));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
