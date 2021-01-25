import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {ImageCanvasComponent} from './image-canvas/image-canvas.component';


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
