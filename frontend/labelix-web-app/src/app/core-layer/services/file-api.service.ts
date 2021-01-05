import { Injectable } from '@angular/core';
import {GenericApiService} from '../utility/logic/generic-api.service';
import {IRawImage} from '../utility/contracts/IRawImage';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class FileApiService extends GenericApiService<IRawImage>{

  constructor(protected httpClient: HttpClient, protected oauthService: OAuthService) {
    super(httpClient, oauthService);
    this.urlRoot = 'api/Base64/UploadImage';
  }

  postListOfRawImages(rawImages: IRawImage[]){
    this.setHeader();
    for (const item of rawImages){
      const reader = new FileReader();
      reader.readAsDataURL(item.file);
      reader.onload = () => {
        this.postBase64Code(reader.result, item).subscribe(value => console.log(value));
      };
    }
  }

  postBase64Code(item: any, file: IRawImage): Observable<HttpEvent<any>> {
    this.setHeader();
    return this.httpClient.post<any>(`${this.urlRoot}`,
      {data: item, name: file.file.name, format: file.file.type},
      { reportProgress: true, observe: 'events', headers: super.headers, responseType: 'json'});
  }

}
