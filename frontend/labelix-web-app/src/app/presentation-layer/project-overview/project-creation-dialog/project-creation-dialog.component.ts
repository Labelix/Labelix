import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProject} from '../../../core-layer/contracts/IProject';
import {ProjectsFacade} from '../../../abstraction-layer/ProjectsFacade';
import {AiModelConfigFacade} from '../../../abstraction-layer/AiModelConfigFacade';
import {IRawImage} from '../../../core-layer/contracts/IRawImage';
import {IImage} from '../../../core-layer/contracts/IImage';
import {MatDialogRef} from '@angular/material/dialog';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {Subscription} from 'rxjs';
import {UserFacade} from '../../../abstraction-layer/UserFacade';
import {IUser} from '../../../core-layer/contracts/IUser';
import {MatListOption} from '@angular/material/list';
import {IAIModelConfig} from '../../../core-layer/contracts/IAIModelConfig';

@Component({
  selector: 'app-project-creation-dialog',
  templateUrl: './project-creation-dialog.component.html',
  styleUrls: ['./project-creation-dialog.component.css']
})
export class ProjectCreationDialogComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  images: IRawImage[];
  imageNumber = 5;
  breakpoint: number;

  project: IProject;
  newProjectName: string;
  newProjectDescription: string;

  addConfigsMode = false;
  allAiConfigs: IAIModelConfig[];
  filteredAiConfigs: IAIModelConfig[];
  selectedAiConfigs: IAIModelConfig[] = [];

  addUserMode = false;
  allUsers: IUser[];
  filteredUsers: IUser[];
  selectedUsers: IUser[] = [];

  constructor(public dialogRef: MatDialogRef<ProjectCreationDialogComponent>,
              private projectFacade: ProjectsFacade,
              private aiModelConfigFacade: AiModelConfigFacade,
              private rawImageFacade: RawImageFacade,
              private userFacade: UserFacade) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {

    this.subscription.add(this.rawImageFacade.rawImages$.subscribe((m) => this.images = m));
    this.subscription.add(this.aiModelConfigFacade.aiModelConfigs$.subscribe(value => this.allAiConfigs = value));
    this.subscription.add(this.userFacade.users$.subscribe(value => this.allUsers = value));
    this.subscription.add(this.dialogRef.afterClosed().subscribe(() => {
      this.rawImageFacade.clearRawImagesOnState();
    }));

    if (this.allUsers.length === 0) {
      this.userFacade.getUsers();
    }

    this.changeRelation(window.innerWidth);
    this.rawImageFacade.clearRawImagesOnState();
    this.aiModelConfigFacade.getConfigs();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onOkSubmit() {
    const imageData: IImage[] = [];
    for (const i of this.images) {
      imageData.push({id: -1, Data: i.base64Url, format: '', imageId: -1, projectId: -1, name: i.name});
    }
    const aiConfigIdList = this.selectedAiConfigs.map(config => config.id);
    console.log(aiConfigIdList);
    this.project = {
      id: 0,
      name: this.newProjectName,
      description: this.newProjectDescription,
      creationDate: new Date(),
      finishedAnnotation: false,
      images: [],
      label: '',
      timestamp: undefined,
      AIModelConfig: aiConfigIdList,
      cocoExport: undefined
    };

    this.subscription.add(this.projectFacade.postProject(this.project).subscribe(newProject => {

      for (const image of imageData) {

        image.projectId = newProject.id;

        this.rawImageFacade.postImage(image).subscribe(value => {
          if (value !== undefined && value !== null) {
            this.rawImageFacade.addRawImageToState({
              id: value.id,
              height: undefined,
              width: undefined,
              base64Url: value.Data,
              name: value.name,
              file: undefined
            });
          }
        });
      }
      this.projectFacade.addProjectToState(newProject);
    }));

    this.dialogRef.close();
  }

  filterUser(value: string) {
    if (value.length !== 0) {
      this.filteredUsers = Object
        .assign([], this.allUsers)
        .filter(item => item.keycloakId.toLowerCase().indexOf(value.toLowerCase()) > -1);
    } else {
      this.filteredUsers = this.allUsers;
    }
  }

  filterConfig(value: string) {
    if (value.length !== 0) {
      this.filteredAiConfigs = Object
        .assign([], this.allAiConfigs)
        .filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
    } else {
      this.filteredAiConfigs = this.allAiConfigs;
    }
  }

  checkIfUserAlreadySelected(user: IUser): boolean {
    for (const item of this.selectedUsers) {
      if (item.keycloakId === user.keycloakId) {
        return true;
      }
    }
    return false;
  }

  checkIfConfigAlreadySelected(config: IAIModelConfig): boolean {
    for (const item of this.selectedAiConfigs) {
      if (item.id === config.id) {
        return true;
      }
    }
    return false;
  }

  clickAddUser() {
    this.addUserMode = true;
    this.filteredUsers = this.allUsers;
  }

  clickDoneUser() {
    this.addUserMode = false;
  }

  clickAddConfig() {
    this.addConfigsMode = true;
    this.filteredAiConfigs = this.allAiConfigs;
  }

  clickDoneConfigs() {
    this.addConfigsMode = false;
  }

  onSelectionListChangesUser(options: MatListOption[]) {
    this.selectedUsers = [];
    options.map(o => this.selectedUsers.push(o.value));
  }

  onSelectionListChangesConfig(options: MatListOption[]) {
    this.selectedAiConfigs = [];
    options.map(o => this.selectedAiConfigs.push(o.value));
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
