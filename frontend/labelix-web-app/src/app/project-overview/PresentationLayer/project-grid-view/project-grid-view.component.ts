import { Component, OnInit } from '@angular/core';
import {IProject} from '../../../utility/contracts/IProject';

@Component({
  selector: 'app-project-grid-view',
  templateUrl: './project-grid-view.component.html',
  styleUrls: ['./project-grid-view.component.css']
})
export class ProjectGridViewComponent implements OnInit {

  testProject: IProject = {
    name: 'Das Testprojekt',
    creator: 'Max Mustermann',
    id: 1,
    creationDate: Date.now(),
  };

  constructor() { }

  ngOnInit(): void {
  }

}
