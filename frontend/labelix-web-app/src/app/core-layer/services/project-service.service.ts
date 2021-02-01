import {Injectable} from '@angular/core';
import {GenericApiService} from '../utility/logic/generic-api.service';
import {IProject} from '../contracts/IProject';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService extends GenericApiService<IProject>{

  constructor(protected  httpClient: HttpClient) {
    super(httpClient);
    this.urlRoot = 'api/project';
  }
}
