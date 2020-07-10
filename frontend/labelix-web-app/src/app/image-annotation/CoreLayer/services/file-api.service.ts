import { Injectable } from '@angular/core';
import {GenericApiService} from '../../../utility/logic/generic-api.service';
import {IFile} from '../../../utility/contracts/IFile';
import {HttpClient, HttpEvent} from '@angular/common/http';
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
      this.postRawFile(item.file).subscribe(value => console.log(value));
    }
  }
  postRawFile(item: File): Observable<HttpEvent<File>> {
    const formData = new FormData();
    formData.append('file', item, item.name);
    return this.httpClient.post<File>(`${this.urlRoot}`, formData, { reportProgress: true, observe: 'events'});
  }
}
