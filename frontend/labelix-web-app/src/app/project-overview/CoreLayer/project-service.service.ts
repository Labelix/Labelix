import { Injectable } from '@angular/core';
import {GenericApiService} from '../../utility/logic/generic-api.service';
import {IProject} from '../../utility/contracts/IProject';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService extends GenericApiService<IProject>{

  path = 'http://localhost:3400/projects';

  constructor(protected  httpClient: HttpClient) {
    super(httpClient);
    this.urlRoot = this.path;
  }
}
