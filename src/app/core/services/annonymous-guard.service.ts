import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { LocalStoragekeysModel } from '../model/local-storagekeys-model';

@Injectable({
  providedIn: 'root'
})
export class AnnonymousGuardService implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.localStorageService.read(LocalStoragekeysModel.adminId)) {

      this.router.navigate(['/dashboard']);
    }

    return true;
  }
}
