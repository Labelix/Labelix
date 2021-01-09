import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProject} from '../../../core-layer/utility/contracts/IProject';
import {ProjectsFacade} from '../../../abstraction-layer/ProjectsFacade';
import {FormControl} from '@angular/forms';
import {AiModelConfigFacade} from '../../../abstraction-layer/AiModelConfigFacade';
import {IRawImage} from '../../../core-layer/utility/contracts/IRawImage';
import {IImage} from '../../../core-layer/utility/contracts/IImage';
import {MatDialogRef} from '@angular/material/dialog';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-project-creation-dialog',
  templateUrl: './project-creation-dialog.component.html',
  styleUrls: ['./project-creation-dialog.component.css']
})
export class ProjectCreationDialogComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  aiModelNames: string[];
  aiIds: number[] = [1, 2]; // todo set to Config ID which is selected
  images: IRawImage[];
  imageNumber = 5;
  breakpoint: number;

  project: IProject;
  newProjectName: string;
  newProjectDescription: string;
  aiModels = new FormControl();

  constructor(public dialogRef: MatDialogRef<ProjectCreationDialogComponent>,
              private projectFacade: ProjectsFacade,
              private aiModelConfigFacade: AiModelConfigFacade,
              private rawImageFacade: RawImageFacade) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.rawImageFacade.rawImages$.subscribe((m) => this.images = m));
    this.subscription.add(this.dialogRef.afterClosed().subscribe(() => {
      this.rawImageFacade.clearRawImagesOnState();
    }));
    this.subscription.add(this.aiModelConfigFacade.aiModelConfigs$.subscribe(value => {
      const names: string[] = [];
      value.forEach(value1 => {
        names.push(value1.name);
      });
      this.aiModelNames = names;
    }));

    this.changeRelation(window.innerWidth);
    this.rawImageFacade.clearRawImagesOnState();
    this.aiModelConfigFacade.getConfigs();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onOkSubmit() {
    const imageData: IImage[] = [];
    for (const i of this.images) {
      imageData.push({id: -1, Data: i.base64Url, format: '', imageId: -1, projectId: -1, name: i.name});
    }
    this.project = {
      id: 0,
      name: this.newProjectName,
      description: this.newProjectDescription,
      creationDate: new Date(),
      finishedAnnotation: false,
      images: [],
      label: '',
      timestamp: undefined,
      AIModelConfig: this.aiIds,
      cocoExport: undefined
    };

    this.subscription.add(this.projectFacade.postProject(this.project).subscribe(newProject => {

      for (const image of imageData) {

        image.projectId = newProject.id;

        this.rawImageFacade.postImage(image).subscribe(value => {
          if (value !== undefined && value !== null) {
            this.rawImageFacade.addRawImageToState({
              id: value.id,
              height: undefined,
              width: undefined,
              base64Url: value.Data,
              name: value.name,
              file: undefined
            });
          }
        });

      }
    }));

    this.dialogRef.close();
  }

  onResize(event) {
    this.changeRelation(event.target.innerWidth);
  }

  private changeRelation(width) {
    if (width >= 3840) {
      this.breakpoint = 8;
    } else if (width >= 3000) {
      this.breakpoint = 6;
    } else if (width >= 1860) {
      this.breakpoint = 4;
    } else if (width >= 1420) {
      this.breakpoint = 3;
    } else if (width >= 950) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 1;
    }
  }
}
