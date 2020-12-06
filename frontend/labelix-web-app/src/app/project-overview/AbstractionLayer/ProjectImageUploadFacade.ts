import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IRawImage} from '../../utility/contracts/IRawImage';
import {select, Store} from '@ngrx/store';
import {ProjectImageUploadState, getNumberOfRawImages, getAllRawImages} from '../CoreLayer/states/projectImageUploadState';
import {AddRawImage} from '../CoreLayer/actions/projectImageUpload.actions';
import {ImageServiceService} from '../CoreLayer/services/image-service.service';

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
}
