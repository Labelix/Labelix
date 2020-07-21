import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ProjectState} from '../../CoreLayer/states/projectState';
import {AddProjectAction} from '../../CoreLayer/actions/project.actions';
import {IProject} from '../../../utility/contracts/IProject';
import {ProjectServiceService} from '../../CoreLayer/services/project-service.service';
import {ProjectsFacade} from '../../AbstractionLayer/ProjectsFacade';

@Component({
  selector: 'app-project-creation-dialog',
  templateUrl: './project-creation-dialog.component.html',
  styleUrls: ['./project-creation-dialog.component.css']
})
export class ProjectCreationDialogComponent implements OnInit {

  constructor(private projectFacade: ProjectsFacade) { }
  project: IProject;

  ngOnInit(): void {
  }
  onOkSubmit() {
    this.project = {
      name: 'a',
      description: 'b',
      creationDate: new Date(),
      finishedAnnotation: false,
      id: 2,
      images: [],
      label: '',
      timestamp: undefined
    };

    this.projectFacade.addProject(this.project);
  }
}
