import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IProject} from '../../utility/contracts/IProject';
import {ProjectServiceService} from '../CoreLayer/project-service.service';
import {shareReplay} from 'rxjs/operators';

@Injectable()
export class ProjectsFacade {
  private projects$: Observable<IProject[]>;

  constructor(private projectApi: ProjectServiceService) {
    this.projects$ = this.projectApi.getItems().pipe(shareReplay(1));
  }

  getProjects(){
    return this.projects$;
  }
}
