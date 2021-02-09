import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {IRawImage} from '../../../../core-layer/contracts/IRawImage';
import {RawImageFacade} from '../../../../abstraction-layer/RawImageFacade';
import {ProjectsFacade} from '../../../../abstraction-layer/ProjectsFacade';
import {IProject} from '../../../../core-layer/contracts/IProject';

@Component({
  selector: 'app-image-upload-edit-dialog',
  templateUrl: './image-upload-edit-dialog.component.html',
  styleUrls: ['./image-upload-edit-dialog.component.css']
})
export class ImageUploadEditDialogComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  @Input() project: IProject;

  rawImages: IRawImage[] = [];

  @ViewChild('fileDropRef', {static: false}) fileDropEl: ElementRef;

  constructor(private rawImageFacade: RawImageFacade,
              private projectFacade: ProjectsFacade) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.rawImageFacade.rawImages$.subscribe((m) => this.rawImages = m));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFileDropped($event) {
    for (const item of $event) {
      const reader = new FileReader();
      const image = new Image();
      reader.addEventListener('load', (event: any) => {
        image.src = event.target.result;
        image.onload = () => {
          this.rawImageFacade.postImage({
            id: -1,
            Height: image.height,
            Width: image.width,
            Data: image.src,
            Name: item.name,
            imageId: -1,
            format: '',
            projectId: this.project.id
          }).subscribe(response => {
            this.rawImageFacade.addRawImageToState({
              base64Url: image.src,
              file: undefined,
              height: image.height,
              id: -1,
              name: image.name,
              width: image.width
            });
          });
        };
      });
      reader.readAsDataURL(item);
    }
  }
}
