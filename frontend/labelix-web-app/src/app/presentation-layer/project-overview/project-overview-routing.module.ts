import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjectOverviewBaseComponent} from './project-overview-base/project-overview-base.component';


const routes: Routes = [{path: '', component: ProjectOverviewBaseComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectOverviewRoutingModule {
}
