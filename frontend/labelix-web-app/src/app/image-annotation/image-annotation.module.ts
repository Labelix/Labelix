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
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MaterialModule} from "../material.module";


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
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MaterialModule,
  ]
})
export class ImageAnnotationModule {
}
