import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LocalStoragekeysModel } from '../model/local-storagekeys-model';
import { InitializeService } from './initialize.service';
import { HttpBaseService } from './http-base.service';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiBaseURL = null;
  public isLoggedIn$ = new BehaviorSubject<any>(null);
  public userInfo: any;
  public isSessionTimeOut$ = new BehaviorSubject<boolean>(false);
  public userIsValid=true;

  constructor(
    private localStorageService: LocalStorageService,
    private initializeService: InitializeService,
    public httpService: HttpBaseService,
    public commonService: CommonService
  ) {
    this.apiBaseURL = environment.apiBaseURL + 'rest/api';
  }


  public isLoggedIn(): boolean {

    if (this.localStorageService.read(LocalStoragekeysModel.adminId)) {
      return true;
    } else {
      return false;
    }
  }

  signIn(model: any): Observable<any> {

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));

    const requestBody = this.commonService.generateRequestParameter('ADM_ADMIN_AUTHENTICATE', model);
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }

  signOut(): Observable<any> {

    const body = {
      userId: this.localStorageService.read(LocalStoragekeysModel.adminId, true)
    };

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));


    const requestBody = this.commonService.generateRequestParameter('ADM_LOGOUT', body);
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }

  clearLoggedInfo() {

    this.localStorageService.delete(LocalStoragekeysModel.adminToken);
    this.localStorageService.delete(LocalStoragekeysModel.adminRefreshToken);
    this.localStorageService.delete(LocalStoragekeysModel.adminId);
    this.localStorageService.delete(LocalStoragekeysModel.roleId);
  }

  validateAdminUser() {

    const body = {
      filter: `userId=${this.localStorageService.read(LocalStoragekeysModel.adminId, true)}`
    };

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + this.localStorageService.read(LocalStoragekeysModel.adminToken));

    const requestBody = this.commonService.generateRequestParameter('ADM_LISTADMINUSERS', body);
    return this.httpService.httpPost(this.apiBaseURL, httpHeaders, requestBody);
  }

  refreshToken(): Observable<any> {

    const requestBody = {
      tokenId: this.localStorageService.read(LocalStoragekeysModel.adminId, true)
    };
    const httpHeaders = new HttpHeaders();
    return this.httpService.httpPost(
      (environment.apiBaseURL + 'rest/refreshToken'),
      httpHeaders, requestBody);
  }

  public publicTokenTimeOut() {
    this.localStorageService.delete(LocalStoragekeysModel.adminId);
    this.localStorageService.delete(LocalStoragekeysModel.adminToken);
    this.localStorageService.delete(LocalStoragekeysModel.adminRefreshToken);
    this.localStorageService.delete(LocalStoragekeysModel.roleId);
    // this.isLoggedIn$.next(false);
  }

  readLoggedUserId(): string {
    return this.localStorageService.read(LocalStoragekeysModel.adminId, true);
  }

}
