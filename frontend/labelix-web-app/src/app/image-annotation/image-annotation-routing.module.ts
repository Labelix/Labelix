import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImageUploadComponent} from './PresentationLayer/image-upload/image-upload.component';
import {ImageCanvasComponent} from './PresentationLayer/image-canvas/image-canvas.component';


const routes: Routes = [
  {path: 'image-view', component: ImageCanvasComponent},
  {path: '', component: ImageUploadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageAnnotationRoutingModule {
}
