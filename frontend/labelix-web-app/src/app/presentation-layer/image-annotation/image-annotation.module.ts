import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImageAnnotationRoutingModule} from './image-annotation-routing.module';
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {FormsModule} from '@angular/forms';
import {DragNDropDirective} from './directives/drag-ndrop.directive';
import {RawImageFacade} from '../../abstraction-layer/RawImageFacade';
import {RawImageEffects} from '../../core-layer/effects/RawImageEffects';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {featureStateName, rawImageReducers} from '../../core-layer/states/rawImageState';
import {labelCategoryName, labelCategoryReducers} from '../../core-layer/states/labelCategoryState';
import { ImageCanvasComponent } from './image-canvas/image-canvas.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MaterialModule} from '../../material.module';
import { MouseWheelDirective } from './directives/mouse-wheel.directive';
import { LabelWidgetComponent } from './label-widget/label-widget.component';
import {LabelCategoryFacade} from '../../abstraction-layer/LabelCategoryFacade';
import { WidgetBarComponent } from './widget-bar/widget-bar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AnnotationFacade} from '../../abstraction-layer/AnnotationFacade';
import {annotationStateName, annotationStateReducers} from '../../core-layer/states/annotationState';
import { WholeImageAnnotationWidgetComponent } from './whole-image-annotation-widget/whole-image-annotation-widget.component';
import { SingleAnnotationExportFormComponent } from './single-annotation-export-form/single-annotation-export-form.component';
import { DeleteImageAnnotationDialogComponent } from './delete-image-annotation-dialog/delete-image-annotation-dialog.component';
import { ImageTimelineComponent } from './image-timeline/image-timeline.component';
import { ImageTimelineSingleImageComponent } from './image-timeline-single-image/image-timeline-single-image.component';
import {ProjectsFacade} from '../../abstraction-layer/ProjectsFacade';
import { SelectedLabelWidgetComponent } from './selected-label-widget/selected-label-widget.component';
import {CocoFormatController} from '../../core-layer/controller/CocoFormatController';
import { LabelSettingsDialogComponent } from './label-settings-dialog/label-settings-dialog.component';
import {ColorChromeModule} from 'ngx-color/chrome';
import {NgxImageZoomModule} from 'ngx-image-zoom';


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
    SingleAnnotationExportFormComponent,
    DragNDropDirective
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
        NgxImageZoomModule,
    ]
})
export class ImageAnnotationModule {
}
