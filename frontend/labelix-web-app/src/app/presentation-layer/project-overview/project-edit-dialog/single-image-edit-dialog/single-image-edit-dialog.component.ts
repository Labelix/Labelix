import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IRawImage} from '../../../../core-layer/contracts/IRawImage';
import {ProjectImageUploadFacade} from '../../../../abstraction-layer/ProjectImageUploadFacade';
import {Subscription} from 'rxjs';
import {RawImageFacade} from '../../../../abstraction-layer/RawImageFacade';
import {IProject} from '../../../../core-layer/contracts/IProject';

@Component({
  selector: 'app-single-image-edit-dialog',
  templateUrl: './single-image-edit-dialog.component.html',
  styleUrls: ['./single-image-edit-dialog.component.css']
})
export class SingleImageEditDialogComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  @Input()
  myImage: IRawImage;

  @Input()
  project: IProject;

  constructor(private rawImageFacade: RawImageFacade) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onImageClick() {
    this.rawImageFacade.deleteImage({
      Height: this.myImage.height,
      Width: this.myImage.width,
      Name: this.myImage.name,
      imageId: this.myImage.id,
      Data: this.myImage.base64Url,
      projectId: this.project.id,
      format: '',
      id: this.myImage.id
    }).subscribe(value => {
      this.rawImageFacade.deleteRawImageOnState(this.myImage);
    });
  }

}
