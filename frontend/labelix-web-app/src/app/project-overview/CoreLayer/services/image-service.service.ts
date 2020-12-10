import {Injectable} from '@angular/core';
import {GenericApiService} from '../../../utility/logic/generic-api.service';
import {IImage} from '../../../utility/contracts/IImage';
import {HttpClient} from '@angular/common/http';
import {IProject} from '../../../utility/contracts/IProject';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService extends GenericApiService<IImage> {

  constructor(protected  httpClient: HttpClient) {
    super(httpClient);
    this.urlRoot = 'api/image';
  }
  getImageByProjectId(projectId: number): Observable<IImage>{
    return this.httpClient.get<IImage>(`${this.urlRoot}/FirstOfProject-${projectId}`);
  }
}
