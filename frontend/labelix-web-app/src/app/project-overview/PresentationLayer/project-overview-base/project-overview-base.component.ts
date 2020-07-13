import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-overview-base',
  templateUrl: './project-overview-base.component.html',
  styleUrls: ['./project-overview-base.component.css']
})
export class ProjectOverviewBaseComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

  onSingleImageAnnotation(): void {
    this.router.navigate(['/image-annotation']);
  }
}
