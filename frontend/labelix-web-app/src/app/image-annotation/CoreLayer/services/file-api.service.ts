import { Injectable } from '@angular/core';
import {GenericApiService} from '../../../utility/logic/generic-api.service';
import {IFile} from '../../../utility/contracts/IFile';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileApiService extends GenericApiService<IFile>{

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.urlRoot = 'https://localhost:5001/ImageUpload/upload';
  }

  postListOfRawImages(rawImages: IFile[]){
    for (const item of rawImages){
      this.postRawFile(item.file);
    }
  }
  postRawFile(item: File): Observable<File> {
    return this.httpClient.post<File>(`${this.urlRoot}`, item).subscribe();
  }
}
