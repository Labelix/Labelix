import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IRawImage} from '../core-layer/utility/contracts/IRawImage';
import {select, Store} from '@ngrx/store';
import {ProjectImageUploadState, getNumberOfRawImages, getAllRawImages} from '../core-layer/states/projectImageUploadState';
import {AddRawImage, DeleteAllImages, DeleteRawImage} from '../core-layer/actions/projectImageUpload.actions';
import {AddBase64CodeToIFile} from '../core-layer/actions/image-annotation.actions';
import {ImageServiceService} from '../core-layer/services/image-service.service';

@Injectable({providedIn: 'root'})
export class ProjectImageUploadFacade {
  rawImages$: Observable<IRawImage[]>;
  numberOfRawImages$: Observable<number>;
  constructor(private service: ImageServiceService, private store: Store<ProjectImageUploadState>) {
    this.rawImages$ = this.store.pipe(select(getAllRawImages));
    this.numberOfRawImages$ = this.store.pipe(select(getNumberOfRawImages));
  }
  postRawImage(importImage: IRawImage){
    this.store.dispatch(new AddRawImage(importImage));
  }
  addBase64CodeToIFile(input: { id: number, baseCode: string }) {
    this.store.dispatch(new AddBase64CodeToIFile({id: input.id, baseCode: input.baseCode}));
  }
  deleteImage(deleteImage: IRawImage){
    this.store.dispatch(new DeleteRawImage(deleteImage));
  }
  deleteAllImages(rollback: number){
    this.store.dispatch(new DeleteAllImages(0));
  }
}
