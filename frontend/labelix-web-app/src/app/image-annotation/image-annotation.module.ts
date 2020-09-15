import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImageAnnotationRoutingModule} from './image-annotation-routing.module';
import {ImageUploadComponent} from './PresentationLayer/image-upload/image-upload.component';
import {FormsModule} from '@angular/forms';
import {DragNDropDirective} from './PresentationLayer/directives/drag-ndrop.directive';
import {RawImageFacade} from './AbstractionLayer/RawImageFacade';
import {ImageFacade} from './AbstractionLayer/ImageFacade';
import {RawImageEffects} from './CoreLayer/effects/RawImageEffects';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {featureStateName, rawImageReducers} from './CoreLayer/states/rawImageState';
import {labelCategoryName, labelCategoryReducers} from './CoreLayer/states/labelCategoryState';
import { ImageCanvasComponent } from './PresentationLayer/image-canvas/image-canvas.component';
import { ToolbarComponent } from './PresentationLayer/toolbar/toolbar.component';
import {MaterialModule} from '../material.module';
import { MouseWheelDirective } from './PresentationLayer/directives/mouse-wheel.directive';
import { LabelWidgetComponent } from './PresentationLayer/label-widget/label-widget.component';
import { SinleLabelPresentationComponent } from './PresentationLayer/label-widget/sub-components/sinle-label-presentation/sinle-label-presentation.component';
import {LabelCategoryFacade} from './AbstractionLayer/LabelCategoryFacade';
import { WidgetBarComponent } from './PresentationLayer/widget-bar/widget-bar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AnnotationFacade} from './AbstractionLayer/AnnotationFacade';
import {annoationStateName, annotationStateReducers} from './CoreLayer/states/annotationState';
import { WholeImageAnnotationWidgetComponent } from './PresentationLayer/whole-image-annotation-widget/whole-image-annotation-widget.component';
import { SingleAnnotationExportFormComponent } from './PresentationLayer/single-annotation-export-form/single-annotation-export-form.component';
import { DeleteImageAnnotationDialogComponent } from './PresentationLayer/delete-image-annotation-dialog/delete-image-annotation-dialog.component';
import { ImageTimelineComponent } from './PresentationLayer/image-timeline/image-timeline.component';
import { ImageTimelineSingleImageComponent } from './PresentationLayer/image-timeline-single-image/image-timeline-single-image.component';
import {ProjectsFacade} from '../project-overview/AbstractionLayer/ProjectsFacade';

@NgModule({
  declarations: [
    ImageUploadComponent,
    DragNDropDirective,
    ImageCanvasComponent,
    ToolbarComponent,
    MouseWheelDirective,
    LabelWidgetComponent,
    SinleLabelPresentationComponent,
    WidgetBarComponent,
    WholeImageAnnotationWidgetComponent,
    SingleAnnotationExportFormComponent,
    DeleteImageAnnotationDialogComponent,
    ImageTimelineComponent,
    ImageTimelineSingleImageComponent
  ],
  providers: [
    RawImageFacade,
    ImageFacade,
    RawImageEffects,
    LabelCategoryFacade,
    AnnotationFacade,
    ProjectsFacade
  ],
  exports: [
    SingleAnnotationExportFormComponent
  ],
  imports: [
    CommonModule,
    ImageAnnotationRoutingModule,
    DragDropModule,
    FormsModule,
    StoreModule.forFeature(featureStateName, rawImageReducers),
    StoreModule.forFeature(labelCategoryName, labelCategoryReducers),
    StoreModule.forFeature(annoationStateName, annotationStateReducers),
    EffectsModule.forFeature([RawImageEffects]),
    MaterialModule
  ]
})
export class ImageAnnotationModule {
}
