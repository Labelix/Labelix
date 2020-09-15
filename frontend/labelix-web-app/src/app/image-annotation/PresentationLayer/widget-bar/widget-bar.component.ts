import {Component, OnInit} from '@angular/core';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {AnnotaionMode} from '../../CoreLayer/annotaionModeEnum';
import {MatDialog} from '@angular/material/dialog';
import {SingleAnnotationExportFormComponent} from '../single-annotation-export-form/single-annotation-export-form.component';
import {IProject} from '../../../utility/contracts/IProject';
import {ProjectConclusionDialogComponent} from '../project-conclusion-dialog/project-conclusion-dialog.component';

@Component({
  selector: 'app-widget-bar',
  templateUrl: './widget-bar.component.html',
  styleUrls: ['./widget-bar.component.css']
})
export class WidgetBarComponent implements OnInit {

  constructor(private annotationFacade: AnnotationFacade, public dialog: MatDialog) {
  }

  currentAnnotationMode: AnnotaionMode;
  activeProject: IProject;

  ngOnInit(): void {
    this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value);
    this.annotationFacade.activeProject.subscribe(value => this.activeProject = value);
  }

  openExportDialog() {
    this.dialog.open(SingleAnnotationExportFormComponent);
  }

  openProjectSavingDialog() {
    this.dialog.open(ProjectConclusionDialogComponent);
  }

}
