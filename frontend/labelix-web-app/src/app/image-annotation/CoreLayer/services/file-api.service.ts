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
    this.urlRoot = 'api/ImageUpload/upload';
  }

  postListOfRawImages(rawImages: IFile[]){
    for (const item of rawImages){
      const reader = new FileReader();
      reader.readAsDataURL(item.file);
      reader.onload = () => {
        console.log(reader.result);
        this.postBase64Code(reader.result, item).subscribe(value => console.log(value));
      };
    }
  }

  postBase64Code(item: any, file: IFile): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(`${this.urlRoot}`,
      {data: item, name: file.file.name, format: file.file.type},
      { reportProgress: true, observe: 'events'});
  }

}
