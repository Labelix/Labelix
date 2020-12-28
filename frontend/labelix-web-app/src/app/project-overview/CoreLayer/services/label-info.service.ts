import {Injectable} from '@angular/core';
import {GenericApiService} from '../../../utility/logic/generic-api.service';
import {IAILabelInfo} from '../../../utility/contracts/IAILabelInfo';
import {HttpClient} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelInfoService extends GenericApiService<IAILabelInfo> {

  constructor(protected  httpClient: HttpClient, protected oauthService: OAuthService) {
    super(httpClient, oauthService);
    this.urlRoot = 'AIConfig';
  }

  // dadurch, dass der Rückgabewert keine IAILabelInfo ist, kann der GenericApiService in diesem Fall nicht benutzt werden
  postLabelInfo(item: IAILabelInfo): Observable<any> {
    return this.httpClient.put(this.urlRoot, item);
  }
}
