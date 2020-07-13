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
    this.urlRoot = 'https://localhost:5001/Base64/UploadImage';
  }

  postListOfRawImages(rawImages: IFile[]){
    for (const item of rawImages){
      const reader = new FileReader();
      reader.readAsDataURL(item.file);
      reader.onload = () => {
        console.log(reader.result);
        this.postBase64Code(reader.result).subscribe(value => console.log(value));
      };
    }
  }
  postBase64Code(item: any): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(`${this.urlRoot}`, {data: item}, { reportProgress: true, observe: 'events'});
  }

}
