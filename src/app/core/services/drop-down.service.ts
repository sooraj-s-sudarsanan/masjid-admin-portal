import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { LocalStorageService } from './local-storage.service';
import { LocalStoragekeysModel } from '../model/local-storagekeys-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { RoleModel } from 'src/app/core/model/role-model';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {
  private apiBaseURL = null;
  constructor(
    public httpService: HttpBaseService,
    public commonService: CommonService,
    public localStorageService: LocalStorageService,
    public authService: AuthenticationService
  ) {
    this.apiBaseURL = environment.apiBaseURL + 'rest/api';
  }

  getMerchant(serviceId: string, inFilter = ''): Observable<any> {

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));
    let filter = inFilter + inFilter !== '' ? ' ## ' : '';
    if (this.authService.userInfo) {
      if (this.authService.userInfo.userRole.roleName.toUpperCase() === RoleModel.merchantAdmin ||
      this.authService.userInfo.userRole.roleName.toUpperCase() === RoleModel.branchAdmin ||
      this.authService.userInfo.userRole.roleName.toUpperCase() === RoleModel.merchantEmployee ) {
        filter = `merchantId==${this.authService.userInfo.merchant.merchantId}`;
      }
    }
    const requestParams = {
      filter
    };
    const requestBody = this.commonService.generateRequestParameter(serviceId, requestParams);
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }

  getBranch(serviceId: string, inFilter = ''): Observable<any> {
  
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));
    let filter = inFilter;
    //console.log(filter);
    if (this.authService.userInfo) {
       if (this.authService.userInfo.userRole.roleName.toUpperCase() === RoleModel.branchAdmin||
       this.authService.userInfo.userRole.roleName.toUpperCase() === RoleModel.merchantEmployee) {
        filter = (inFilter !== '' ? ' ## ' : '');
        filter = `branchId==${this.authService.userInfo.branch.branchId}`;
      }
    }
    const requestParams = {
      filter
    };
    const requestBody = this.commonService.generateRequestParameter(serviceId, requestParams);
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }
}
