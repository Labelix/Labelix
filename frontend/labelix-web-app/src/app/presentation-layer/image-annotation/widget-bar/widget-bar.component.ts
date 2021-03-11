import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {AnnotationMode} from '../../../core-layer/utility/annotation-mode-enum';
import {MatDialog} from '@angular/material/dialog';
import {SingleAnnotationExportFormComponent} from '../single-annotation-export-form/single-annotation-export-form.component';
import {IProject} from '../../../core-layer/contracts/IProject';
import {ProjectConclusionDialogComponent} from '../project-conclusion-dialog/project-conclusion-dialog.component';
import {ICategory} from '../../../core-layer/contracts/ICategory';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-widget-bar',
  templateUrl: './widget-bar.component.html',
  styleUrls: ['./widget-bar.component.css']
})
export class WidgetBarComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  currentAnnotationMode: AnnotationMode;
  activeProject: IProject;
  activeLabel: ICategory;

  constructor(private annotationFacade: AnnotationFacade, public dialog: MatDialog) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value));
    this.subscription.add(this.annotationFacade.activeProject.subscribe(value => this.activeProject = value));
    this.subscription.add(this.annotationFacade.activeLabel.subscribe(value => this.activeLabel = value));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openExportDialog() {
    this.dialog.open(SingleAnnotationExportFormComponent);
  }

  openProjectSavingDialog() {
    this.dialog.open(ProjectConclusionDialogComponent);
  }

}
