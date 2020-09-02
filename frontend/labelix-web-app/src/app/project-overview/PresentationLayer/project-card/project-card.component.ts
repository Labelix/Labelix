import {Component, Input, OnInit} from '@angular/core';
import {IProject} from '../../../utility/contracts/IProject';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  @Input()
  myProject: IProject;

  constructor(public router: Router) { }

  ngOnInit(): void {
    console.log(this.myProject.finishedAnnotation);
  }

  onStartAnnotating(): void {
    console.log('test');
    this.router.navigate(['/image-annotation/image-view']);
  }

}
