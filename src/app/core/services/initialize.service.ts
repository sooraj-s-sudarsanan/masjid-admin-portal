import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpBaseService } from './http-base.service';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { InitializeModel } from '../model/initialize-model';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LocalStoragekeysModel } from '../model/local-storagekeys-model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class InitializeService {

  private apiBaseURL = null;
  public initializeCompleted$ = new BehaviorSubject<boolean>(false);
  constructor(
    public httpService: HttpBaseService,
    public localStorageService: LocalStorageService
    ) {

    this.apiBaseURL = environment.apiBaseURL + 'rest/initialize';
  }

  // Init service
  public Init(): Observable<any> {

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

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.set('channel', 'web');
    httpHeaders = httpHeaders.set('deviceId', deviceInfo.ID.value);
    httpHeaders = httpHeaders.set('sourceip', '10.25.36.396');
    httpHeaders = httpHeaders.set('deviceOs', 'windows');

    return this.httpService.httpGet(this.apiBaseURL, httpHeaders, null);
  }
}
