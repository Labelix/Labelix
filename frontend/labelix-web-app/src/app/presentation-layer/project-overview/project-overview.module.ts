import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectOverviewRoutingModule } from './project-overview-routing.module';
import {ProjectOverviewBaseComponent} from './project-overview-base/project-overview-base.component';
import { ProjectGridViewComponent } from './project-grid-view/project-grid-view.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProjectCardComponent } from './project-card/project-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProjectsFacade} from '../../abstraction-layer/ProjectsFacade';
import {StoreModule} from '@ngrx/store';
import {featureStateName, projectReducers} from '../../core-layer/states/state-definitions/projectState';
import { AddProjectCardComponent } from './add-project-card/add-project-card.component';
import { ProjectCreationDialogComponent } from './project-creation-dialog/project-creation-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AiModelConfigFacade} from '../../abstraction-layer/AiModelConfigFacade';
import {aiModelConfigReducers, featureAiModelConfigStateName} from '../../core-layer/states/state-definitions/aiModelConfigState';
import {AnnotationFacade} from '../../abstraction-layer/AnnotationFacade';
import {RawImageFacade} from '../../abstraction-layer/RawImageFacade';
import { ProjectConclusionDialogComponent } from '../image-annotation/project-conclusion-dialog/project-conclusion-dialog.component';
import {ImageAnnotationModule} from '../image-annotation/image-annotation.module';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import {projectImageUploadReducers, projectImageUploadStateName} from '../../core-layer/states/state-definitions/projectImageUploadState';
import {ImageTimelineComponent} from './image-timeline/image-timeline.component';
import {ImageTimelineSingleImageComponent} from './image-timeline-single-image/image-timeline-single-image.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {UserFacade} from '../../abstraction-layer/UserFacade';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {userReducers, userStateName} from '../../core-layer/states/state-definitions/userState';
import { ProjectEditDialogComponent } from './project-edit-dialog/project-edit-dialog.component';
import { ImageUploadEditDialogComponent } from './project-edit-dialog/image-upload-edit-dialog/image-upload-edit-dialog.component';
import { SingleImageEditDialogComponent } from './project-edit-dialog/single-image-edit-dialog/single-image-edit-dialog.component';

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
    ProjectEditDialogComponent,
    ImageUploadEditDialogComponent,
    SingleImageEditDialogComponent,
  ],
  imports: [
    CommonModule,
    ProjectOverviewRoutingModule,
    MatGridListModule,
    MatCardModule,
    StoreModule.forFeature(featureStateName, projectReducers),
    StoreModule.forFeature(featureAiModelConfigStateName, aiModelConfigReducers),
    StoreModule.forFeature(projectImageUploadStateName, projectImageUploadReducers),
    StoreModule.forFeature(userStateName, userReducers),
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ImageAnnotationModule,
    DragDropModule,
    MatTabsModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatListModule,
    MatRadioModule
  ],
  providers: [
    ProjectsFacade,
    AiModelConfigFacade,
    AnnotationFacade,
    RawImageFacade,
    UserFacade,
    MatDialog
  ]
})
export class ProjectOverviewModule { }
