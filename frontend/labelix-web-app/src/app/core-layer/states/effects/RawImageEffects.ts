import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {ImageApi} from '../../services/image-api.service';

@Injectable()
export class RawImageEffects {
  constructor(private actions$: Actions, private fileApiService: ImageApi) {
  }
}
