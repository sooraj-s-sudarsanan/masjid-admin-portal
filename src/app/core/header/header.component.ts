import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/change-password/change-password.component';
import { InitializeService } from '../services/initialize.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  userInfo: any;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public headerService: HeaderService,
    public initializeService: InitializeService,
    public authService: AuthenticationService) { }

  ngOnInit(): any {

    this.authService.isLoggedIn$.subscribe((response) => {

      this.isLoggedIn = response;
      if (response && this.authService.userInfo) {
        this.userInfo = this.authService.userInfo;       
      }
    });
  }

  logOut(): any {

    this.authService.signOut().subscribe((response) => {
      this.authService.clearLoggedInfo();
      this.initializeService.initializeCompleted$.next(false);
      this.authService.isLoggedIn$.next(false);
      this.authService.userInfo = null;
      this.authService.userIsValid=true;
      this.router.navigate(['/login']);
    });

  }
  onClickChangePswd($event):any{
    const actionDialogRef = this.dialog.open(ChangePasswordComponent, {
      disableClose: true       
    });

    actionDialogRef.afterClosed().subscribe(result => {     
      if (result) {        
      }
    });
  }
}
