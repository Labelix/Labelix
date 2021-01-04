import { Injectable } from '@angular/core';
import {GenericApiService} from '../utility/logic/generic-api.service';
import {IImage} from '../utility/contracts/IImage';
import {HttpClient} from '@angular/common/http';
import {IRawImage} from '../utility/contracts/IRawImage';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageApiService extends GenericApiService<IImage>{

  constructor(protected  httpClient: HttpClient) {
    super(httpClient);
    this.urlRoot = 'http://localhost:3400/images';
  }


}

