import {Component, OnInit} from '@angular/core';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {AnnotationMode} from '../../../core-layer/utility/annotaionModeEnum';
import {MatDialog} from '@angular/material/dialog';
import {SingleAnnotationExportFormComponent} from '../single-annotation-export-form/single-annotation-export-form.component';
import {IProject} from '../../../core-layer/utility/contracts/IProject';
import {ProjectConclusionDialogComponent} from '../project-conclusion-dialog/project-conclusion-dialog.component';
import {ICategory} from '../../../core-layer/utility/contracts/ICategory';

@Component({
  selector: 'app-widget-bar',
  templateUrl: './widget-bar.component.html',
  styleUrls: ['./widget-bar.component.css']
})
export class WidgetBarComponent implements OnInit {

  constructor(private annotationFacade: AnnotationFacade, public dialog: MatDialog) {
  }

  currentAnnotationMode: AnnotationMode;
  activeProject: IProject;
  activeLabel: ICategory;

  ngOnInit(): void {
    this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value);
    this.annotationFacade.activeProject.subscribe(value => this.activeProject = value);
    this.annotationFacade.activeLabel.subscribe(value => this.activeLabel = value);
  }

  openExportDialog() {
    this.dialog.open(SingleAnnotationExportFormComponent);
  }

  openProjectSavingDialog() {
    this.dialog.open(ProjectConclusionDialogComponent);
  }

}
