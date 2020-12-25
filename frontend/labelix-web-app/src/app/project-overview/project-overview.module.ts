import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectOverviewRoutingModule } from './project-overview-routing.module';
import {ProjectOverviewBaseComponent} from './PresentationLayer/project-overview-base/project-overview-base.component';
import { ProjectGridViewComponent } from './PresentationLayer/project-grid-view/project-grid-view.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProjectCardComponent } from './PresentationLayer/project-card/project-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProjectsFacade} from './AbstractionLayer/ProjectsFacade';
import {MaterialModule} from '../material.module';
import {StoreModule} from '@ngrx/store';
import {featureStateName, projectReducers} from './CoreLayer/states/projectState';
import { AddProjectCardComponent } from './PresentationLayer/add-project-card/add-project-card.component';
import { ProjectCreationDialogComponent } from './PresentationLayer/project-creation-dialog/project-creation-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AiModelConfigFacade} from './AbstractionLayer/AiModelConfigFacade';
import {aiModelConfigReducers, featureAiModelConfigStateName} from './CoreLayer/states/aiModelConfigState';
import {AnnotationFacade} from '../image-annotation/AbstractionLayer/AnnotationFacade';
import {RawImageFacade} from '../image-annotation/AbstractionLayer/RawImageFacade';
import { ProjectConclusionDialogComponent } from '../image-annotation/PresentationLayer/project-conclusion-dialog/project-conclusion-dialog.component';
import {ImageAnnotationModule} from '../image-annotation/image-annotation.module';
import { ImageUploadComponent } from './PresentationLayer/image-upload/image-upload.component';
import {projectImageUploadReducers, projectImageUploadStateName} from './CoreLayer/states/projectImageUploadState';
import {ImageTimelineComponent} from './PresentationLayer/image-timeline/image-timeline.component';
import {ImageTimelineSingleImageComponent} from './PresentationLayer/image-timeline-single-image/image-timeline-single-image.component';

@NgModule({
  declarations: [
    ProjectOverviewBaseComponent,
    ProjectGridViewComponent,
    ProjectCardComponent,
    AddProjectCardComponent,
    ProjectCreationDialogComponent,
    ProjectConclusionDialogComponent,
    ImageUploadComponent,
    ImageTimelineComponent,
    ImageTimelineSingleImageComponent,
  ],
  imports: [
    CommonModule,
    ProjectOverviewRoutingModule,
    MatGridListModule,
    MatCardModule,
    StoreModule.forFeature(featureStateName, projectReducers),
    StoreModule.forFeature(featureAiModelConfigStateName, aiModelConfigReducers),
    StoreModule.forFeature(projectImageUploadStateName, projectImageUploadReducers),
    MatButtonModule,
    MatProgressSpinnerModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ImageAnnotationModule
  ],
  providers: [
    ProjectsFacade,
    AiModelConfigFacade,
    AnnotationFacade,
    RawImageFacade
  ]
})
export class ProjectOverviewModule { }
