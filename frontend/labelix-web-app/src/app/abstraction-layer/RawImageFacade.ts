import {Injectable} from '@angular/core';
import {ImageApi} from '../core-layer/services/image-api.service';
import {select, Store} from '@ngrx/store';
import {getAllRawImages, getNumberOfExistingImages, RawImageState} from '../core-layer/states/rawImageState';
import {IRawImage} from '../core-layer/utility/contracts/IRawImage';
import {Observable} from 'rxjs';
import {IImage} from '../core-layer/utility/contracts/IImage';
import {
  AddBase64CodeToIFile,
  AddRawImage,
  AddRawImages, DeleteAllImages,
  DeleteRawImage,
  UpdateRawImage
} from '../core-layer/actions/projectImageUpload.actions';

@Injectable()
export class RawImageFacade {

  numberOfImages$: Observable<number>;
  rawImages$: Observable<IRawImage[]>;

  constructor(private imageApi: ImageApi, private store: Store<RawImageState>) {
    this.rawImages$ = this.store.pipe(select(getAllRawImages));
    this.numberOfImages$ = this.store.pipe(select(getNumberOfExistingImages));
  }

  addRawImageToState(importImage: IRawImage) {
    this.store.dispatch(new AddRawImage(importImage));
  }

  addRawImagesToState(input: IRawImage[]) {
    this.store.dispatch(new AddRawImages(input));
  }

  updateRawImagesOnState(input: IRawImage) {
    this.store.dispatch(new UpdateRawImage(input));
  }

  deleteRawImageOnState(deleteImage: IRawImage) {
    this.store.dispatch(new DeleteRawImage(deleteImage));
  }

  clearRawImagesOnState() {
    this.store.dispatch(new DeleteAllImages());
  }

  addBase64CodeToRawImageOnState(input: { id: number, baseCode: string }) {
    this.store.dispatch(new AddBase64CodeToIFile({id: input.id, baseCode: input.baseCode}));
  }

  postImage(image: IImage): Observable<IImage> {
    return this.imageApi.postItem(image);
  }

  putImage(image: IImage): Observable<IImage> {
    return this.imageApi.putItem(image);
  }

  deleteImage(image: IImage): Observable<IImage> {
    return this.imageApi.deleteItem(image);
  }

}
