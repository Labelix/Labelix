import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IRawImage} from '../../utility/contracts/IRawImage';
import {select, Store} from '@ngrx/store';
import {ProjectImageUploadState, getNumberOfRawImages, getAllRawImages} from '../CoreLayer/states/projectImageUploadState';
import {AddRawImage, DeleteRawImage} from '../CoreLayer/actions/projectImageUpload.actions';
import {ImageServiceService} from '../CoreLayer/services/image-service.service';
import {AddBase64CodeToIFile} from '../../image-annotation/CoreLayer/actions/image-annotation.actions';

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
    // tslint:disable-next-line:forin
  }
  addBase64CodeToIFile(input: { id: number, baseCode: string }) {
    this.store.dispatch(new AddBase64CodeToIFile({id: input.id, baseCode: input.baseCode}));
  }
  deleteImage(deleteImage: IRawImage){
    this.store.dispatch(new DeleteRawImage(deleteImage));
  }
}
