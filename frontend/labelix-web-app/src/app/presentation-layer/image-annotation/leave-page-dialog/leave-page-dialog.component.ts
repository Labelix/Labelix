import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {ProjectsFacade} from '../../../abstraction-layer/ProjectsFacade';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {LabelCategoryFacade} from '../../../abstraction-layer/LabelCategoryFacade';
import {CocoFormatHelper} from '../../../core-layer/utility/helper/coco-format-helper.service';
import {Subscription} from 'rxjs';
import {IProject} from '../../../core-layer/contracts/IProject';
import {ICategory} from '../../../core-layer/contracts/ICategory';
import {IImageAnnotation} from '../../../core-layer/contracts/IImageAnnotation';
import {IRawImage} from '../../../core-layer/contracts/IRawImage';
import {Project} from '../../../core-layer/models/Project';

@Component({
  selector: 'app-leave-page-dialog',
  templateUrl: './leave-page-dialog.component.html',
  styleUrls: ['./leave-page-dialog.component.css']
})
export class LeavePageDialogComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  activeProject: IProject;
  currentCategoryLabels: ICategory[];
  currentImageAnnotations: IImageAnnotation[];
  currentRawImages: IRawImage[];

  constructor(public dialogRef: MatDialogRef<LeavePageDialogComponent>,
              private annotationFacade: AnnotationFacade,
              private projectFacade: ProjectsFacade,
              private rawImageFacade: RawImageFacade,
              private labelCategoryFacade: LabelCategoryFacade,
              private cocoFormatter: CocoFormatHelper) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.annotationFacade.activeProject.subscribe(value => this.activeProject = value));
    this.subscription.add(this.annotationFacade.currentImageAnnotations.subscribe(value => this.currentImageAnnotations = value));
    this.subscription.add(this.rawImageFacade.rawImages$.subscribe(value => this.currentRawImages = value));
    this.subscription.add(this.labelCategoryFacade.labelCategories$.subscribe(value => this.currentCategoryLabels = value));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onLeaveWithoutSaving() {
    this.dialogRef.close(true);
  }

  onLeaveWithSaving() {
    const jsonObject = this.cocoFormatter.getJsonObjectAsString(this.currentCategoryLabels, this.currentImageAnnotations,
      this.currentRawImages, this.activeProject);

    const newProject = new Project();
    newProject.copyProperties(this.activeProject);
    newProject.label = jsonObject;
    this.annotationFacade.replaceActiveProject(newProject);

    // images always have to be transferred separately because the json object would become to large as it stands now 6.1.2020
    const transferObject: IProject = {
      images: [],
      id: this.activeProject.id,
      AIModelConfig: this.activeProject.AIModelConfig,
      cocoExport: this.activeProject.cocoExport,
      creationDate: this.activeProject.creationDate,
      description: this.activeProject.description,
      finishedAnnotation: this.activeProject.finishedAnnotation,
      label: this.activeProject.label,
      name: this.activeProject.name,
      timestamp: this.activeProject.timestamp
    };

    // change changesPresent to false, so Labelix knows it can leave the page without a warning
    this.annotationFacade.changesPresent = false;

    this.projectFacade.putProject(transferObject).subscribe();

    this.dialogRef.close(true);
  }

}
