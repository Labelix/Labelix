import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImageAnnotationRoutingModule} from './image-annotation-routing.module';
import {ImageUploadComponent} from './PresentationLayer/image-upload/image-upload.component';
import {TestCanvasComponent} from './PresentationLayer/test-canvas/test-canvas.component';
import {FormsModule} from '@angular/forms';
import {DragNDropDirective} from './PresentationLayer/directives/drag-ndrop.directive';
import {RawImageFacade} from './AbstractionLayer/RawImageFacade';
import {ImageFacade} from './AbstractionLayer/ImageFacade';
import {RawImageEffects} from './CoreLayer/effects/RawImageEffects';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {featureStateName, labelCategoryName, labelCategoryReducers, rawImageReducers} from './CoreLayer';
import { ImageCanvasComponent } from './PresentationLayer/image-canvas/image-canvas.component';
import { ToolbarComponent } from './PresentationLayer/toolbar/toolbar.component';
import {MaterialModule} from '../material.module';
import { MouseWheelDirective } from './PresentationLayer/directives/mouse-wheel.directive';
import { LabelWidgetComponent } from './PresentationLayer/label-widget/label-widget.component';
import { SinleLabelPresentationComponent } from './PresentationLayer/label-widget/sub-components/sinle-label-presentation/sinle-label-presentation.component';
import {LabelCategoryFacade} from './AbstractionLayer/LabelCategoryFacade';
import { WidgetBarComponent } from './PresentationLayer/widget-bar/widget-bar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    ImageUploadComponent,
    TestCanvasComponent,
    DragNDropDirective,
    ImageCanvasComponent,
    ToolbarComponent,
    MouseWheelDirective,
    LabelWidgetComponent,
    SinleLabelPresentationComponent,
    WidgetBarComponent
  ],
  providers: [
    RawImageFacade,
    ImageFacade,
    RawImageEffects,
    LabelCategoryFacade
  ],
  imports: [
    CommonModule,
    ImageAnnotationRoutingModule,
    DragDropModule,
    FormsModule,
    StoreModule.forFeature(featureStateName, rawImageReducers),
    StoreModule.forFeature(labelCategoryName, labelCategoryReducers),
    EffectsModule.forFeature([RawImageEffects]),
    MaterialModule
  ]
})
export class ImageAnnotationModule {
}
