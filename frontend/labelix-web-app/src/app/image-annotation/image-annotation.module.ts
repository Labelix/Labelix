import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageAnnotationRoutingModule } from './image-annotation-routing.module';
import { ImageUploadComponent } from './PresentationLayer/image-upload/image-upload.component';
import { TestCanvasComponent } from './PresentationLayer/test-canvas/test-canvas.component';
import {FormsModule} from "@angular/forms";
import { DragNDropDirective } from './PresentationLayer/drag-ndrop.directive';


@NgModule({
  declarations: [ImageUploadComponent, TestCanvasComponent, DragNDropDirective],
  imports: [
    CommonModule,
    ImageAnnotationRoutingModule,
    FormsModule
  ]
})
export class ImageAnnotationModule { }
