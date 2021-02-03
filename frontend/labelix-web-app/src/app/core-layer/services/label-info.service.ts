import {Injectable} from '@angular/core';
import {GenericApiService} from '../utility/logic/generic-api.service';
import {IAILabelInfo} from '../contracts/IAILabelInfo';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelInfoService extends GenericApiService<IAILabelInfo> {

  constructor(protected  httpClient: HttpClient) {
    super(httpClient);
    this.urlRoot = 'AIConfig';
  }
}
