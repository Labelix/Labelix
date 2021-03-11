import {Injectable} from '@angular/core';
import {ProjectServiceService} from '../core-layer/services/project-service.service';
import {select, Store} from '@ngrx/store';
import {
  getAllProjects,
  getCurrentUploadProjectName,
  getNumberOfExistingProjects, getNumberOfImagesToUpload, getNumberOfUploadedImages,
  ProjectState
} from '../core-layer/states/state-definitions/projectState';
import {IProject} from '../core-layer/contracts/IProject';
import {
  AddProjectAction,
  ClearUploadInformationAction,
  DeleteProjectAction,
  GetProjectsAction, IncreaseNumberOfUploadedImagesAction, SetNameOfUploadProjectAction, SetNumberOfImagesToUploadAction
} from '../core-layer/states/actions/project.actions';
import {Observable} from 'rxjs';

@Injectable()
export class ProjectsFacade {
  projects$: Observable<IProject[]>;
  numberOfProjects$: Observable<number>;

  // these variables are here to keep track of an currently uploading project
  numberOfImagesToUpload$: Observable<number>;
  numberOfUploadedImages$: Observable<number>;
  nameOfUploadingProject$: Observable<string>;

  constructor(private projectApi: ProjectServiceService, private store: Store<ProjectState>) {
    this.projects$ = this.store.pipe(select(getAllProjects));
    this.numberOfProjects$ = this.store.pipe(select(getNumberOfExistingProjects));
    this.nameOfUploadingProject$ = this.store.pipe(select(getCurrentUploadProjectName));
    this.numberOfImagesToUpload$ = this.store.pipe(select(getNumberOfImagesToUpload));
    this.numberOfUploadedImages$ = this.store.pipe(select(getNumberOfUploadedImages));
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

  clearProjectUploadInformationOnState() {
    this.store.dispatch(new ClearUploadInformationAction());
  }

  increaseUploadedImagesOnState() {
    this.store.dispatch(new IncreaseNumberOfUploadedImagesAction());
  }

  setCurrentlyUploadingProjectNameOnState(name: string) {
    this.store.dispatch(new SetNameOfUploadProjectAction(name));
  }

  setNumberOfImagesToUpload(numberOfImagesToUpload: number) {
    this.store.dispatch(new SetNumberOfImagesToUploadAction(numberOfImagesToUpload));
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
