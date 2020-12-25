import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IIdentifiable} from '../contracts/IIdentifiable';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class GenericApiService<T extends IIdentifiable> {
  urlRoot = '';

  protected headers: HttpHeaders;

  constructor(protected  httpClient: HttpClient, protected  oauthService: OAuthService) {

  }

  protected setHeader(): void {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.oauthService.getAccessToken()
    });
  }

  getItems(): Observable<T[]> {
    this.setHeader();
    return this.httpClient.get<T[]>(`${this.urlRoot}/all`, {headers: this.headers, responseType: 'json'});
  }
  getItemById(id: number): Observable<T> {
    this.setHeader();
    return this.httpClient.get<T>(`${this.urlRoot}/${id}`, {headers: this.headers, responseType: 'json'});
  }

  patchItem(item: T): Observable<T> {
    this.setHeader();
    return this.httpClient.patch<T>(`${this.urlRoot}/${item.id}`, item, {headers: this.headers, responseType: 'json'});
  }

  putItem(item: T): Observable<T> {
    this.setHeader();
    return this.httpClient.put<T>(`${this.urlRoot}/${item.id}`, item, {headers: this.headers, responseType: 'json'});
  }

  postItem(item: T): Observable<T> {
    this.setHeader();
    return this.httpClient.post<T>(`${this.urlRoot}/create`, item, {headers: this.headers, responseType: 'json'});
  }

  deleteItem(item: T): Observable<T> {
    this.setHeader();
    return this.httpClient.delete<T>(`${this.urlRoot}/delete-${item.id}`, {headers: this.headers, responseType: 'json'});
  }
}
