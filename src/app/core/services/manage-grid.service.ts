import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ManageGridModel } from '../model/manage-grid-model';
import { HttpBaseService } from './http-base.service';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { InitializeService } from './initialize.service';
import { HttpHeaders } from '@angular/common/http';
import { ManageGridServiceBaseModel } from '../model/manage-grid-service-base-model';
import { LocalStorageService } from './local-storage.service';
import { LocalStoragekeysModel } from '../model/local-storagekeys-model';

@Injectable({
  providedIn: 'root'
})

export class ManageGridService {
  private apiBaseURL = null;
  gridBase = [];
  public loadFilters$ = new BehaviorSubject<any>(null);
  constructor(
    public httpService: HttpBaseService,
    public commonService: CommonService,
    public initializeService: InitializeService,
    public localStorageService: LocalStorageService) {

    this.apiBaseURL = environment.apiBaseURL + 'rest/api';
    this.gridBase = ManageGridServiceBaseModel.data;
  }

  // Grid Listing
  public getRowData(manageGridModel: ManageGridModel): Observable<any> {

    const serviceId = this.getServiceId(manageGridModel.section, 'listServiceId');
    const requestParams = {
      page: +manageGridModel.pageNumber + 1,
      limit: manageGridModel.size
    };
    if (manageGridModel.roleName) {
      requestParams['roleNames'] = manageGridModel.roleName;
    }
    if (manageGridModel.sortBy && manageGridModel.sortOrder) {
      requestParams['sortBy'] = manageGridModel.sortBy;
      requestParams['sortOrder'] = manageGridModel.sortOrder.toUpperCase();
    } else {
      requestParams['sortBy'] = 'createdOn';
      requestParams['sortOrder'] = 'DESC';
    }
    if (manageGridModel.filter) {
      requestParams['filter'] = manageGridModel.filter;
    }
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));

    const requestBody = this.commonService.generateRequestParameter(serviceId, requestParams);
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }

  // ADD
  addORupdateRowData(section: string, isAddAction: boolean, model: any): Observable<any> {

    const serviceId = isAddAction ? this.getServiceId(section, 'createServiceId') :
      this.getServiceId(section, 'updateServiceId');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));

    const requestBody = this.commonService.generateRequestParameter(serviceId, model);
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }

  // Edit
  editRowData(section: string, model: any): Observable<any> {

    const serviceId = this.getServiceId(section, 'updateServiceId');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));

    const requestBody = this.commonService.generateRequestParameter(serviceId, model);
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }

  // Delete
  deleteRowData(section: string, model: any): Observable<any> {

    const serviceId = this.getServiceId(section, 'deleteServiceId');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));

    const requestBody = this.commonService.generateRequestParameter(serviceId, model);
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }


  // Get serviceID
  public getServiceId(inSection, serviceType): string {

    let targetServiceID: any;
    const find = this.gridBase.find(x => x.section === inSection);
    if (find) {
      switch (serviceType) {
        case 'createServiceId': {
          targetServiceID = find.createServiceId;
          break;
        }
        case 'updateServiceId': {
          targetServiceID = find.updateServiceId;
          break;
        }
        case 'deleteServiceId': {
          targetServiceID = find.deleteServiceId;
          break;
        }
        case 'listServiceId': {
          targetServiceID = find.listServiceId;
          break;
        }
        default: {
          break;
        }
      }
    }
    return targetServiceID;
  }
}


