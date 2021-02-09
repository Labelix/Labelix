import {Injectable} from '@angular/core';
import {ProjectServiceService} from '../core-layer/services/project-service.service';
import {select, Store} from '@ngrx/store';
import {getAllProjects, getNumberOfExistingProjects, ProjectState} from '../core-layer/states/state-definitions/projectState';
import {IProject} from '../core-layer/contracts/IProject';
import {AddProjectAction, DeleteProjectAction, GetProjectsAction} from '../core-layer/states/actions/project.actions';
import {Observable} from 'rxjs';

@Injectable()
export class ProjectsFacade {
  projects$: Observable<IProject[]>;
  numberOfProjects$: Observable<number>;

  constructor(private projectApi: ProjectServiceService, private store: Store<ProjectState>) {
    this.projects$ = this.store.pipe(select(getAllProjects));
    this.numberOfProjects$ = this.store.pipe(select(getNumberOfExistingProjects));
  }

  getProjects() {
    this.projectApi.getItems().subscribe((value: IProject[]) => {
      this.store.dispatch(new GetProjectsAction(value));
    });
  }

  postProject(importProject: IProject): Observable<IProject> {
    return this.projectApi.postItem(importProject);
  }

  addProjectToState(project: IProject) {
    this.store.dispatch(new AddProjectAction(project));
  }

  getProjectById(id: number): Observable<IProject> {
    return this.projectApi.getItemById(id);
  }

  putProject(data: IProject): Observable<IProject> {
    return this.projectApi.putItem(data);
  }

  deleteProject(data: IProject) {
    this.projectApi.deleteItem(data).subscribe(() => this.removeProjectFromState(data));
  }

  removeProjectFromState(project: IProject) {
    this.store.dispatch(new DeleteProjectAction(project));
  }

  checkIfNameIsAlreadyPresent(newName: string, projects: IProject[]): boolean {

    for (const current of projects) {
      if (current.name === newName) {
        return true;
      }
    }

    return false;
  }

}
