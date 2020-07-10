import {Injectable} from '@angular/core';
import {FileApiService} from '../CoreLayer/services/file-api.service';
import {select, Store} from '@ngrx/store';
import {getAllRawImages, getNumberOfExistingImages, RawImageState} from '../CoreLayer';
import {IFile} from '../../utility/contracts/IFile';
import {AddRawImagesAction} from '../CoreLayer/actions/image-annotation.actions';
import {Observable} from 'rxjs';

@Injectable()
export class RawImageFacade {
  constructor(private fileApi: FileApiService, private store: Store<RawImageState>) {
    this.files$ = this.store.pipe(select(getAllRawImages));
    this.numberOfImages$ = this.store.pipe(select(getNumberOfExistingImages));
  }

  numberOfImages$: Observable<number>;
  files$: Observable<IFile[]>;

  uploadRawImages(importImages: IFile[]){
    this.store.dispatch(new AddRawImagesAction(importImages));
    this.fileApi.postListOfRawImages(importImages);
  }
}
