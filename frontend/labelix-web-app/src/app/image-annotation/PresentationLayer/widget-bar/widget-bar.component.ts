import {Component, OnInit} from '@angular/core';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {AnnotaionMode} from '../../CoreLayer/annotaionModeEnum';
import {MatDialog} from '@angular/material/dialog';
import {SingleAnnotationExportFormComponent} from '../single-annotation-export-form/single-annotation-export-form.component';
import {IProject} from '../../../utility/contracts/IProject';
import {ProjectConclusionDialogComponent} from '../project-conclusion-dialog/project-conclusion-dialog.component';
import {ICategory} from '../../../utility/contracts/ICategory';
import {AiModelConfigFacade} from '../../../project-overview/AbstractionLayer/AiModelConfigFacade';
import {IAIModelConfig} from '../../../utility/contracts/IAIModelConfig';

@Component({
  selector: 'app-widget-bar',
  templateUrl: './widget-bar.component.html',
  styleUrls: ['./widget-bar.component.css']
})
export class WidgetBarComponent implements OnInit {

  constructor(private annotationFacade: AnnotationFacade,
              public dialog: MatDialog,
              private aiModelConfigFacade: AiModelConfigFacade) {
  }

  currentAnnotationMode: AnnotaionMode;
  activeProject: IProject;
  activeLabel: ICategory;

  ngOnInit(): void {
    this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value);
    this.annotationFacade.activeProject.subscribe(value => this.activeProject = value);
    this.annotationFacade.activeLabel.subscribe(value => this.activeLabel = value);
  }

  onLabelAllWithAI() {
    let config: IAIModelConfig;
    this.aiModelConfigFacade.aiModelConfigs$.subscribe(value => config = value[0]);
    this.annotationFacade.sendAllToAI(this.activeProject, config);
  }

  openExportDialog() {
    this.dialog.open(SingleAnnotationExportFormComponent);
  }

  openProjectSavingDialog() {
    this.dialog.open(ProjectConclusionDialogComponent);
  }

}
