import {Component, Input, OnInit} from '@angular/core';
import {IProject} from '../../../utility/contracts/IProject';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  @Input()
  myProject: IProject;

  constructor() { }

  ngOnInit(): void {
    console.log(this.myProject.finishedAnnotation);
  }

}
