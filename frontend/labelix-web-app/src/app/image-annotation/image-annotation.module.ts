import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImageAnnotationRoutingModule} from './image-annotation-routing.module';
import {ImageUploadComponent} from './PresentationLayer/image-upload/image-upload.component';
import {FormsModule} from '@angular/forms';
import {DragNDropDirective} from './PresentationLayer/directives/drag-ndrop.directive';
import {RawImageFacade} from './AbstractionLayer/RawImageFacade';
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
import {LabelCategoryFacade} from './AbstractionLayer/LabelCategoryFacade';
import { WidgetBarComponent } from './PresentationLayer/widget-bar/widget-bar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AnnotationFacade} from './AbstractionLayer/AnnotationFacade';
import {annotationStateName, annotationStateReducers} from './CoreLayer/states/annotationState';
import { WholeImageAnnotationWidgetComponent } from './PresentationLayer/whole-image-annotation-widget/whole-image-annotation-widget.component';
import { SingleAnnotationExportFormComponent } from './PresentationLayer/single-annotation-export-form/single-annotation-export-form.component';
import { DeleteImageAnnotationDialogComponent } from './PresentationLayer/delete-image-annotation-dialog/delete-image-annotation-dialog.component';
import { ImageTimelineComponent } from './PresentationLayer/image-timeline/image-timeline.component';
import { ImageTimelineSingleImageComponent } from './PresentationLayer/image-timeline-single-image/image-timeline-single-image.component';
import {ProjectsFacade} from '../project-overview/AbstractionLayer/ProjectsFacade';
import { SelectedLabelWidgetComponent } from './PresentationLayer/selected-label-widget/selected-label-widget.component';
import {CocoFormatController} from './CoreLayer/controller/CocoFormatController';
import { LabelSettingsDialogComponent } from './PresentationLayer/label-settings-dialog/label-settings-dialog.component';
import {ColorChromeModule} from 'ngx-color/chrome';


@NgModule({
  declarations: [
    ImageUploadComponent,
    DragNDropDirective,
    ImageCanvasComponent,
    ToolbarComponent,
    MouseWheelDirective,
    LabelWidgetComponent,
    WidgetBarComponent,
    WholeImageAnnotationWidgetComponent,
    SingleAnnotationExportFormComponent,
    DeleteImageAnnotationDialogComponent,
    ImageTimelineComponent,
    ImageTimelineSingleImageComponent,
    SelectedLabelWidgetComponent,
    LabelSettingsDialogComponent,
  ],
  providers: [
    RawImageFacade,
    RawImageEffects,
    LabelCategoryFacade,
    AnnotationFacade,
    ProjectsFacade,
    CocoFormatController
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
    StoreModule.forFeature(annotationStateName, annotationStateReducers),
    EffectsModule.forFeature([RawImageEffects]),
    MaterialModule,
    ColorChromeModule,
  ]
})
export class ImageAnnotationModule {
}
