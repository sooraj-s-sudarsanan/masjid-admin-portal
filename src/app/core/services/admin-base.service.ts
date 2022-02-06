import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { LocalStorageService } from './local-storage.service';
import { LocalStoragekeysModel } from '../model/local-storagekeys-model';

@Injectable({
  providedIn: 'root'
})
export class AdminBaseService {
  private apiBaseURL = null;
  constructor(
    public httpService: HttpBaseService,
    public commonService: CommonService,
    public localStorageService: LocalStorageService
  ) {
    this.apiBaseURL = environment.apiBaseURL + 'rest/api';
  }

  public requestSubmit(serviceId: string, requestParams: any, token = null): Observable<any> {

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + (token ? token : this.localStorageService.read(LocalStoragekeysModel.adminToken)));

    const requestBody = this.commonService.generateRequestParameter(serviceId, requestParams);
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }
}
