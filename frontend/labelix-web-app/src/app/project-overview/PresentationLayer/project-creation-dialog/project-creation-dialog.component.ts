import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ProjectState} from '../../CoreLayer/states/projectState';
import {AddProjectAction} from '../../CoreLayer/actions/project.actions';
import {IProject} from '../../../utility/contracts/IProject';
import {ProjectServiceService} from '../../CoreLayer/services/project-service.service';
import {ProjectsFacade} from '../../AbstractionLayer/ProjectsFacade';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-project-creation-dialog',
  templateUrl: './project-creation-dialog.component.html',
  styleUrls: ['./project-creation-dialog.component.css']
})
export class ProjectCreationDialogComponent implements OnInit {

  constructor(private projectFacade: ProjectsFacade) { }
  project: IProject;
  newProjectName: string;
  newProjectDescription: string;
  aiModels = new FormControl();
  aiModelList: string[] = ['Giraffenerkennung'];
  ngOnInit(): void {
  }
  onOkSubmit() {
    this.project = {
      id: 0,
      name: this.newProjectName,
      description: this.newProjectDescription,
      creationDate: new Date(),
      finishedAnnotation: false,
      images: [],
      label: '',
      timestamp: undefined
    };
    console.log(this.newProjectName);
    this.projectFacade.addProject(this.project);
  }
}
