import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStoragekeysModel } from '../model/local-storagekeys-model';
import { SidebarNavigationModel } from '../model/sidebar-navigation-model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  permissionModuleList = [];
  currPagePermission = null;

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  manageMenuList(): any {
    const navItems = JSON.parse(JSON.stringify((SidebarNavigationModel.navItems)));
    // Super Admin check
    const roleId = this.localStorageService.read(LocalStoragekeysModel.roleId, true);
    if (roleId === environment.superAdminRoleId) {
      return navItems;
    }
    if (this.permissionModuleList.length > 0) {
      // console.log(SidebarNavigationModel.navItems)
      navItems.forEach(element => {

        // console.log(element);
        const childNavItems = [...element.children];
        childNavItems.forEach((child, i) => {
          // console.log(i);
          const find = this.permissionModuleList.find(x => x.menus.menuUrl === child.route);
          if (find === null || find === undefined) {
            element.children = element.children.filter(obj => obj !== child);
            // element.children.splice(i,1);
            // delete element.children[i];
          }
        });

      });
      // console.log(navItems);
    } else {
      if (roleId === environment.superAdminRoleId) {
        return navItems;
      }
      return [];
    }
    return navItems;
  }

  hasPermission(type): boolean {
    if (this.currPagePermission) {
      if (type === 'New') {
        return this.currPagePermission.hasCreatePermission;
      } else if (type === 'Info') {
        return this.currPagePermission.hasViewPermission;
      } else if (type === 'Edit') {
        return this.currPagePermission.hasUpdatePermission;
      } else if (type === 'Delete') {
        return this.currPagePermission.hasDeletePermission;
      }
    }
    return false;
  }
}
