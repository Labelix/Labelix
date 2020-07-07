import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectOverviewRoutingModule } from './project-overview-routing.module';
import {ProjectOverviewBaseComponent} from './PresentationLayer/project-overview-base/project-overview-base.component';


@NgModule({
  declarations: [
    ProjectOverviewBaseComponent,
  ],
  imports: [
    CommonModule,
    ProjectOverviewRoutingModule
  ]
})
export class ProjectOverviewModule { }
