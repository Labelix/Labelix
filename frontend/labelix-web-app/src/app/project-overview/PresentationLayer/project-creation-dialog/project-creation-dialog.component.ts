import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ProjectState} from '../../CoreLayer/states/projectState';
import {AddProjectAction} from '../../CoreLayer/actions/project.actions';
import {IProject} from '../../../utility/contracts/IProject';
import {ProjectServiceService} from '../../CoreLayer/services/project-service.service';
import {ProjectsFacade} from '../../AbstractionLayer/ProjectsFacade';
import {FormControl} from '@angular/forms';
import {AiModelConfigFacade} from '../../AbstractionLayer/AiModelConfigFacade';
import {IRawImage} from '../../../utility/contracts/IRawImage';
import {ProjectImageUploadFacade} from '../../AbstractionLayer/ProjectImageUploadFacade';
import {IImage} from '../../../utility/contracts/IImage';

@Component({
  selector: 'app-project-creation-dialog',
  templateUrl: './project-creation-dialog.component.html',
  styleUrls: ['./project-creation-dialog.component.css']
})
export class ProjectCreationDialogComponent implements OnInit {

  aiModelNames: string[];
  aiIds: number[] = [1, 2]; // todo set to Config ID wich is seleted
  images: IRawImage[];

  // tslint:disable-next-line:max-line-length
  constructor(private projectFacade: ProjectsFacade, private aiModelConfigFacade: AiModelConfigFacade, private imageUploadFacade: ProjectImageUploadFacade) {
    this.imageUploadFacade.rawImages$.subscribe((m) => this.images = m);
  }
  project: IProject;
  newProjectName: string;
  newProjectDescription: string;
  aiModels = new FormControl();

  ngOnInit(): void {
    this.aiModelConfigFacade.getConfigs();
    this.aiModelConfigFacade.aiModelConfigs$.subscribe(value => {
      const names: string[] = [];
      value.forEach(value1 => {
        names.push(value1.name);
        console.log(value1.name);
      });
      this.aiModelNames = names;
    });
  }
  onOkSubmit() {
    const imageData: IImage[] = [];
    for (const i of this.images){
      imageData.push({id: -1, Data: i.base64Url, format: '', imageId: -1, projectId: -1, name: i.name});
    }
    this.project = {
      id: 0,
      name: this.newProjectName,
      description: this.newProjectDescription,
      creationDate: new Date(),
      finishedAnnotation: false,
      images: imageData,
      label: '',
      timestamp: undefined,
      AIModelConfig: this.aiIds,
      cocoExport: undefined
    };
    console.log(this.newProjectName);
    this.projectFacade.postProject(this.project);
  }
}
