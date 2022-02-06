import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { InitializeService } from './initialize.service';
import { HttpBaseService } from './http-base.service';
import { CommonService } from './common.service';
import { LocalStorageService } from './local-storage.service';
import { LocalStoragekeysModel } from '../model/local-storagekeys-model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiBaseURL = null;

  constructor(
    public httpService: HttpBaseService,
    public commonService: CommonService,
    public localStorageService: LocalStorageService) {
    this.apiBaseURL = environment.apiBaseURL + 'rest/api';
  }

  getRoleTypes(): Observable<any> {

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));

    const requestBody = this.commonService.generateRequestParameter('ADM_LISTROLETYPES');
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }

  getAdminRoleTypes(): Observable<any> {

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));

    const requestBody = this.commonService.generateRequestParameter('ADM_LISTADMINROLES');
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }

  
  getPublicRoleTypes(): Observable<any> {

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));

    const requestBody = this.commonService.generateRequestParameter('ADM_LISTCUSTOMERROLES');
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }

  getRoleList(): Observable<any> {

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));

    const requestBody = this.commonService.generateRequestParameter('ADM_LISTROLES');
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }

  viewRole(model: any): Observable<any> {

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));

    const requestBody = this.commonService.generateRequestParameter('ADM_GET_PERMISSION_BYROLEID', model);
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }

  addMultiplePermission(model: any): Observable<any> {

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));

    const requestBody = this.commonService.generateRequestParameter('ADM_ADD_MULTIPLE_PERMISSIONS', model);
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }
}
