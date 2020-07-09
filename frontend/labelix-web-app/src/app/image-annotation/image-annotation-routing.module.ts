import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImageUploadComponent} from './PresentationLayer/image-upload/image-upload.component';


const routes: Routes = [
  {path: '', component: ImageUploadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageAnnotationRoutingModule {
}
