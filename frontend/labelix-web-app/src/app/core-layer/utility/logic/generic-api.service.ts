import {IIdentifiable} from '../../contracts/IIdentifiable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GenericApiService<T extends IIdentifiable> {
  urlRoot = '';

  protected headers: HttpHeaders;

  constructor(protected  httpClient: HttpClient) {

  }

  getItems(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.urlRoot}/all`);
  }

  getItemById(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.urlRoot}/${id}`);
  }

  patchItem(item: T): Observable<T> {
    return this.httpClient.patch<T>(`${this.urlRoot}/${item.id}`, item);
  }

  postItem(item: T): Observable<T> {
    return this.httpClient.post<T>(`${this.urlRoot}/create`, item);
  }

  putItem(item: T): Observable<T> {
    return this.httpClient.put<T>(`${this.urlRoot}/update`, item);
  }

  deleteItem(item: T): Observable<T> {
    return this.httpClient.delete<T>(`${this.urlRoot}/delete-${item.id}`);
  }
}
