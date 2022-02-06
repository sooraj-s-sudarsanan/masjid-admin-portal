import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { LocalStoragekeysModel } from '../model/local-storagekeys-model';
import { AuthenticationService } from './authentication.service';
import { PermissionService } from './permission.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthenticationService,
    private permissionService: PermissionService

  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    const roleId = this.localStorageService.read(LocalStoragekeysModel.roleId, true);
    if (this.localStorageService.read(LocalStoragekeysModel.adminId) && roleId) {
      if (state.url && state.url !== '/Dashboard' && roleId !== environment.superAdminRoleId) {
        const url = state.url.replace(/^\//g, '');
        if (url && this.permissionService.permissionModuleList) {
          const find = this.permissionService.permissionModuleList.filter(x => x.children.some(y => y.route === url));
          if (find === null || find === undefined || find.length === 0) {
            return false;
          }
        }
      }
      return true;
    }
    this.localStorageService.delete(LocalStoragekeysModel.adminToken);
    this.localStorageService.delete(LocalStoragekeysModel.adminId);
    this.localStorageService.delete(LocalStoragekeysModel.roleId);
    // this.authService.isLoggedIn$.next(false);
    this.router.navigate(['/login']);

    return false;
  }
}
