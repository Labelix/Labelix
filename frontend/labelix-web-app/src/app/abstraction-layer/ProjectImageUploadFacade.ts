import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IRawImage} from '../core-layer/utility/contracts/IRawImage';
import {select, Store} from '@ngrx/store';
import {ProjectImageUploadState, getNumberOfRawImages, getAllRawImages} from '../core-layer/states/state-definitions/projectImageUploadState';
import {AddBase64CodeToIFile, AddRawImage, DeleteAllImages, DeleteRawImage} from '../core-layer/actions/projectImageUpload.actions';
import {ImageApi} from '../core-layer/services/image-api.service';

@Injectable({providedIn: 'root'})
export class ProjectImageUploadFacade {

  rawImages$: Observable<IRawImage[]>;
  numberOfRawImages$: Observable<number>;

  constructor(private service: ImageApi, private store: Store<ProjectImageUploadState>) {
    this.rawImages$ = this.store.pipe(select(getAllRawImages));
    this.numberOfRawImages$ = this.store.pipe(select(getNumberOfRawImages));
  }
  postRawImage(importImage: IRawImage) {
    this.store.dispatch(new AddRawImage(importImage));
  }

  addBase64CodeToIFile(input: { id: number, baseCode: string }) {
    this.store.dispatch(new AddBase64CodeToIFile({id: input.id, baseCode: input.baseCode}));
  }

  deleteImage(deleteImage: IRawImage) {
    this.store.dispatch(new DeleteRawImage(deleteImage));
  }

  deleteAllImages(rollback: number) {
    this.store.dispatch(new DeleteAllImages());
  }
}
