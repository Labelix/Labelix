import {Injectable} from '@angular/core';
import {FileApiService} from '../CoreLayer/services/file-api.service';
import {select, Store} from '@ngrx/store';
import {getAllRawImages, getNumberOfExistingImages, RawImageState} from '../CoreLayer/states/rawImageState';
import {IRawImage} from '../../utility/contracts/IRawImage';
import {AddBase64CodeToIFile, AddRawImagesAction, ClearRawImages, UpdateRawImage} from '../CoreLayer/actions/image-annotation.actions';
import {Observable} from 'rxjs';

@Injectable()
export class RawImageFacade {

  constructor(private fileApi: FileApiService, private store: Store<RawImageState>) {
    this.files$ = this.store.pipe(select(getAllRawImages));
    this.numberOfImages$ = this.store.pipe(select(getNumberOfExistingImages));
  }

  numberOfImages$: Observable<number>;
  files$: Observable<IRawImage[]>;

  uploadRawImages(importImages: IRawImage[]) {
    this.addRawImagesToState(importImages);
    // this.fileApi.postListOfRawImages(importImages);
  }

  updateRawImage(input: IRawImage) {
    this.store.dispatch(new UpdateRawImage(input));
  }

  addBase64CodeToIFile(input: { id: number, baseCode: string }) {
    this.store.dispatch(new AddBase64CodeToIFile({id: input.id, baseCode: input.baseCode}));
  }

  addRawImagesToState(input: IRawImage[]) {
    this.store.dispatch(new AddRawImagesAction(input));
  }

  clearRawImages() {
    this.store.dispatch(new ClearRawImages());
  }

}
