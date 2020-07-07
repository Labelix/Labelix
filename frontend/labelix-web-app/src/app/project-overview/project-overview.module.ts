import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectOverviewRoutingModule } from './project-overview-routing.module';
import {ProjectOverviewBaseComponent} from './PresentationLayer/project-overview-base/project-overview-base.component';
import { ProjectGridViewComponent } from './PresentationLayer/project-grid-view/project-grid-view.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { ProjectCardComponent } from './PresentationLayer/project-card/project-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ProjectOverviewBaseComponent,
    ProjectGridViewComponent,
    ProjectCardComponent,
  ],
  imports: [
    CommonModule,
    ProjectOverviewRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ProjectOverviewModule { }