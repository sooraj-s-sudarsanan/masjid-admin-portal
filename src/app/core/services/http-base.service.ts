import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LocalStoragekeysModel } from '../model/local-storagekeys-model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  constructor(
    public http: HttpClient,
    public localStorageService: LocalStorageService
  ) { }

  public httpGet(apiroute: any, headers?: any, params?: any): Observable<any> {
    return this.http.get(apiroute, { headers, params });
  }

  public httpPost(apiroute: any, headers?: any, body?: any): Observable<any> {
    headers = this.setDefaultHeaders(headers);
    return this.http.post(apiroute, body, { headers });
  }

  public httpPut(apiroute: any, headers?: any, params?: any): Observable<any> {
    return this.http.put(apiroute, { headers, params });
  }

  public httpDelete(apiroute: any, headers?: any, params?: any): Observable<any> {
    return this.http.delete(apiroute, { headers, params });
  }

  /**
   * Set default Headers
   */
  public setDefaultHeaders(httpHeaders: HttpHeaders): HttpHeaders {

    let deviceInfo = null;
    const encDevInfo = this.localStorageService.read(LocalStoragekeysModel.devInfo, true);
    if (encDevInfo) {
      deviceInfo = JSON.parse(encDevInfo);
    } else {
      deviceInfo = {
        ID: Guid.create()
      };
      this.localStorageService.create(LocalStoragekeysModel.devInfo, JSON.stringify(deviceInfo), true);
    }

    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.set('channel', 'web');
    httpHeaders = httpHeaders.set('deviceId', deviceInfo.ID.value);
    httpHeaders = httpHeaders.set('sourceip', '192.168.0.39');
    httpHeaders = httpHeaders.set('deviceOs', 'windows');
    return httpHeaders;
  }
}
