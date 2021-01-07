import {Component, OnInit} from '@angular/core';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {IProject} from '../../../core-layer/utility/contracts/IProject';
import {ProjectsFacade} from '../../../abstraction-layer/ProjectsFacade';
import {ICategory} from '../../../core-layer/utility/contracts/ICategory';
import {IImageAnnotation} from '../../../core-layer/utility/contracts/IImageAnnotation';
import {IRawImage} from '../../../core-layer/utility/contracts/IRawImage';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {LabelCategoryFacade} from '../../../abstraction-layer/LabelCategoryFacade';
import {CocoFormatController} from '../../../core-layer/controller/CocoFormatController';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-project-conclusion-dialog',
  templateUrl: './project-conclusion-dialog.component.html',
  styleUrls: ['./project-conclusion-dialog.component.css']
})
export class ProjectConclusionDialogComponent implements OnInit {

  activeProject: IProject;
  currentCategoryLabels: ICategory[];
  currentImageAnnotations: IImageAnnotation[];
  currentRawImages: IRawImage[];

  constructor(public dialogRef: MatDialogRef<ProjectConclusionDialogComponent>,
              private annotationFacade: AnnotationFacade,
              private projectFacade: ProjectsFacade,
              private rawImageFacade: RawImageFacade,
              private labelCategoryFacade: LabelCategoryFacade,
              private cocoFormatter: CocoFormatController,
              private router: Router) {

    annotationFacade.activeProject.subscribe(value => this.activeProject = value);
    this.annotationFacade.currentImageAnnotations.subscribe(value => this.currentImageAnnotations = value);
    this.rawImageFacade.rawImages$.subscribe(value => this.currentRawImages = value);
    this.labelCategoryFacade.labelCategories$.subscribe(value => this.currentCategoryLabels = value);
  }

  ngOnInit(): void {
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

    this.projectFacade.putProject(transferObject);
    this.router.navigate(['projects']);
    this.dialogRef.close();
  }

}
