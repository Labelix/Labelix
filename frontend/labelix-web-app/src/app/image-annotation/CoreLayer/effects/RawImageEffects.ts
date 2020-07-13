import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {FileApiService} from '../services/file-api.service';
import {ActionTypes, AddRawImagesAction} from '../actions/image-annotation.actions';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class RawImageEffects {
  constructor(private actions$: Actions, private fileApiService: FileApiService) {
  }


}
