import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../../../core-layer/models/Project';
import {ProjectsFacade} from '../../../abstraction-layer/ProjectsFacade';
import {AiModelConfigFacade} from '../../../abstraction-layer/AiModelConfigFacade';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {UserFacade} from '../../../abstraction-layer/UserFacade';
import {IAIModelConfig} from '../../../core-layer/contracts/IAIModelConfig';
import {IUser} from '../../../core-layer/contracts/IUser';
import {IRawImage} from '../../../core-layer/contracts/IRawImage';
import {MatListOption} from '@angular/material/list';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-project-edit-dialog',
  templateUrl: './project-edit-dialog.component.html',
  styleUrls: ['./project-edit-dialog.component.css']
})
export class ProjectEditDialogComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  project: Project;

  images: IRawImage[];
  imageNumber = 5;
  breakpoint: number;

  addConfigsMode = false;
  allAiConfigs: IAIModelConfig[];
  filteredAiConfigs: IAIModelConfig[];
  configsAlreadyInProject: IAIModelConfig[];
  selectedAiConfigs: IAIModelConfig[] = [];

  addUserMode = false;
  allUsers: IUser[];
  filteredUsers: IUser[];
  usersAlreadyInProject: IUser[];
  selectedUsers: IUser[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ProjectEditDialogComponent>,
              private projectFacade: ProjectsFacade,
              private aiModelConfigFacade: AiModelConfigFacade,
              private rawImageFacade: RawImageFacade,
              private userFacade: UserFacade) {
    this.project = new Project(this.data.project);
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.changeRelation(window.innerWidth);
    this.rawImageFacade.clearRawImagesOnState();

    this.aiModelConfigFacade.loadAllConfigsToState();
    this.userFacade.loadUsersIntoState();

    this.subscription.add(this.userFacade.getUsersByProjectId(this.project.id)
      .subscribe(value => {
        value.forEach(user => {
          this.usersAlreadyInProject.push(user);
          this.selectedUsers.push(user);
        });
      }));

    this.subscription.add(this.aiModelConfigFacade.getConfigsByProjectId(this.project.id)
      .subscribe(value => value.forEach(aiConfig => {
        this.selectedAiConfigs.push(aiConfig);
        this.configsAlreadyInProject.push(aiConfig);
      })));

    this.subscription.add(this.userFacade.users$.subscribe((value) => this.allUsers = value));
    this.subscription.add(this.rawImageFacade.rawImages$.subscribe((m) => this.images = m));
    this.subscription.add(this.aiModelConfigFacade.aiModelConfigs$.subscribe(value => this.allAiConfigs = value));

    this.projectFacade.getProjectById(this.project.id).subscribe(value => {
      if (value !== undefined) {
        this.rawImageFacade.clearRawImagesOnState();
        this.project.label = value.label;
        value.images.forEach(image => this.rawImageFacade.addRawImageToState({
          width: image.Width,
          name: image.name,
          id: image.id,
          height: image.Height,
          file: undefined,
          base64Url: image.Data
        }));
      }
    });

    this.subscription.add(this.dialogRef.afterClosed().subscribe(() => this.rawImageFacade.clearRawImagesOnState()));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onOkSubmit() {
    const aiConfigIdList = this.selectedAiConfigs.map(aiConfig => aiConfig.id);

    this.projectFacade.putProject(this.project).subscribe(newProject => {
      this.projectFacade.removeProjectFromState(this.project);
      this.projectFacade.addProjectToState(newProject);
      this.selectedUsers.forEach(value => this.userFacade.addUserToProjectViaId(newProject.id, value)
        .subscribe());
    });

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

  checkIfConfigAlreadySelected(aiConfig: IAIModelConfig): boolean {
    for (const item of this.selectedAiConfigs) {
      if (item.id === aiConfig.id) {
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
