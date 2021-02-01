import {Injectable} from '@angular/core';
import {GenericApiService} from '../utility/logic/generic-api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IImage} from '../contracts/IImage';

@Injectable({
  providedIn: 'root'
})
export class ImageApi extends GenericApiService<IImage> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.urlRoot = 'api/Image';
  }

  getImagesByProjectId(projectId: number): Observable<IImage[]> {
    return this.httpClient.get<IImage[]>(`${this.urlRoot}/GetByProjectId-${projectId}`);
  }

  getImageByProjectId(projectId: number): Observable<IImage> {
    return this.httpClient.get<IImage>(`${this.urlRoot}/FirstOfProject-${projectId}`);
  }

}
