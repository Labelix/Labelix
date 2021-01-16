import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProject} from '../../../core-layer/contracts/IProject';
import {ProjectsFacade} from '../../../abstraction-layer/ProjectsFacade';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-project-grid-view',
  templateUrl: './project-grid-view.component.html',
  styleUrls: ['./project-grid-view.component.css']
})
export class ProjectGridViewComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  projects: IProject[] = undefined;
  breakpoint: number;

  constructor(private projectsFacade: ProjectsFacade) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.projectsFacade.projects$.subscribe((m) => this.projects = m));

    this.changeRelation(window.innerWidth);
    this.projectsFacade.getProjects();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
