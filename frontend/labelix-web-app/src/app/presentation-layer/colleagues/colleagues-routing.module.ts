import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ColleaguesBaseComponent} from './colleagues-base/colleagues-base.component';


const routes: Routes = [
  {path: '', component: ColleaguesBaseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColleaguesRoutingModule {
}
