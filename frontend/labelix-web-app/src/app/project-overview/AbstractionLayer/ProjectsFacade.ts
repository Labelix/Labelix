import {Injectable} from '@angular/core';
import {ProjectServiceService} from '../CoreLayer/services/project-service.service';
import {select, Store} from '@ngrx/store';
import {getAllProjects, getNumberOfExistingProjects, ProjectState} from '../CoreLayer/states/projectState';
import {IProject} from '../../utility/contracts/IProject';
import {AddProjectAction, DeleteProjectAction, GetProjectsAction} from '../CoreLayer/actions/project.actions';
import {Observable} from 'rxjs';

@Injectable()
export class ProjectsFacade {
  projects$: Observable<IProject[]>;
  numberOfProjects$: Observable<number>;

  constructor(private projectApi: ProjectServiceService, private store: Store<ProjectState>) {
    this.projects$ = this.store.pipe(select(getAllProjects));
    this.numberOfProjects$ = this.store.pipe(select(getNumberOfExistingProjects));
  }

  async getProjects() {
    this.projectApi.getItems().subscribe((value: IProject[]) => {
      this.store.dispatch(new GetProjectsAction(value));
    });
  }

  postProject(importProject: IProject) {
    this.projectApi.postItem(importProject).subscribe();
    this.store.dispatch(new AddProjectAction(importProject));
  }

  getProjectObservableNyId(id: number): Observable<IProject> {
    return this.projectApi.getItemById(id);
  }

  putProject(data: IProject) {
    this.projectApi.updateProject(data).subscribe(value => console.log(value));
  }
  deleteProject(data: IProject){
    this.projectApi.deleteItem(data).subscribe(() => {this.store.dispatch(new DeleteProjectAction(data)); });
  }
}
