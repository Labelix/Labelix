import { Injectable } from '@angular/core';
import {GenericApiService} from '../utility/logic/generic-api.service';
import {IProject} from '../utility/contracts/IProject';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService extends GenericApiService<IProject>{

  constructor(protected  httpClient: HttpClient) {
    super(httpClient);
    this.urlRoot = 'api/project';
  }

  updateProject(item: IProject): Observable<IProject> {
    return this.httpClient.put<IProject>(`${this.urlRoot}/update`, item);
  }
}
