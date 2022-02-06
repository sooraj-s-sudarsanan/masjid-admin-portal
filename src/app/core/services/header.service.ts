import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public showSpinner$ = new BehaviorSubject<boolean>(false);
  public currentUrl = new BehaviorSubject<string>(undefined);
  public sideNav: any;
  constructor(
    private router: Router,
    private authService: AuthenticationService
    ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public toggleNav() {
    if (this.authService.isLoggedIn()) {

      this.sideNav.toggle();
    } else {
      return false;
    }
  }

  public toggleSpinner(show: boolean) {
    this.showSpinner$.next(show);
  }
}
