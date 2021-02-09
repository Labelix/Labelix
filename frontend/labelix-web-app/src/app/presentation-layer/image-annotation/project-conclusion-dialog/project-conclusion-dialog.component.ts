import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {IProject} from '../../../core-layer/contracts/IProject';
import {ProjectsFacade} from '../../../abstraction-layer/ProjectsFacade';
import {ICategory} from '../../../core-layer/contracts/ICategory';
import {IImageAnnotation} from '../../../core-layer/contracts/IImageAnnotation';
import {IRawImage} from '../../../core-layer/contracts/IRawImage';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {LabelCategoryFacade} from '../../../abstraction-layer/LabelCategoryFacade';
import {CocoFormatHelper} from '../../../core-layer/utility/helper/coco-format-helper.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-project-conclusion-dialog',
  templateUrl: './project-conclusion-dialog.component.html',
  styleUrls: ['./project-conclusion-dialog.component.css']
})
export class ProjectConclusionDialogComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  activeProject: IProject;
  currentCategoryLabels: ICategory[];
  currentImageAnnotations: IImageAnnotation[];
  currentRawImages: IRawImage[];

  constructor(public dialogRef: MatDialogRef<ProjectConclusionDialogComponent>,
              private annotationFacade: AnnotationFacade,
              private projectFacade: ProjectsFacade,
              private rawImageFacade: RawImageFacade,
              private labelCategoryFacade: LabelCategoryFacade,
              private cocoFormatter: CocoFormatHelper,
              private router: Router) {
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

  onSaveWork() {
    const jsonObject: string = JSON.stringify({
      categories: this.cocoFormatter.createListOfICocoCategory(this.currentCategoryLabels),
      annotations: this.cocoFormatter.getCocoAnnotations(this.currentImageAnnotations),
      licenses: [this.cocoFormatter.getTestLicense()],
      images: this.cocoFormatter.createListOfICocoImages(this.currentRawImages),
      info: {
        year: 2020,
        description: this.activeProject.description,
        version: '1.0',
        url: 'testurl',
        dateCreated: new Date(Date.now()),
        // TODO implement this when users are finished
        contributor: 'yet to come'
      }
    });

    this.annotationFacade.replaceActiveProject({
      description: this.activeProject.description,
      creationDate: this.activeProject.creationDate,
      name: this.activeProject.name,
      finishedAnnotation: this.activeProject.finishedAnnotation,
      AIModelConfig: this.activeProject.AIModelConfig,
      id: this.activeProject.id,
      images: this.activeProject.images,
      label: jsonObject,
      timestamp: this.activeProject.timestamp,
      cocoExport: undefined
    });

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
    this.annotationFacade.changesPresent = false;
    this.projectFacade.putProject(transferObject).subscribe();
    this.router.navigate(['projects']);
    this.dialogRef.close();
  }

}
