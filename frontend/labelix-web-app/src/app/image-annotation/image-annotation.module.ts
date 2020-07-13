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
import {featureStateName, rawImageReducers} from './CoreLayer';
import { ImageCanvasComponent } from './PresentationLayer/image-canvas/image-canvas.component';
import { ToolbarComponent } from './PresentationLayer/toolbar/toolbar.component';
import {MaterialModule} from '../material.module';

import {ComponentType, GoldenLayoutModule} from 'ngx-golden-layout';
import * as $ from 'jquery';

// It is required to have JQuery as global in the window object.
window['$'] = $;

const componentTypes: ComponentType[] = [{
  name: 'toolbar',
  type: ToolbarComponent,
}];

@NgModule({
  declarations: [
    ImageUploadComponent,
    TestCanvasComponent,
    DragNDropDirective,
    ImageCanvasComponent,
    ToolbarComponent
  ],
  providers: [
    RawImageFacade,
    ImageFacade,
    RawImageEffects
  ],
  imports: [
    CommonModule,
    ImageAnnotationRoutingModule,
    FormsModule,
    StoreModule.forFeature(featureStateName, rawImageReducers),
    EffectsModule.forFeature([RawImageEffects]),
    MaterialModule,
    GoldenLayoutModule.forRoot(componentTypes)
  ]
})
export class ImageAnnotationModule {
}
