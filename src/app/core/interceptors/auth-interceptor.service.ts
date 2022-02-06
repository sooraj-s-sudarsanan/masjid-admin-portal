import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { filter, take, switchMap, finalize, catchError, map } from 'rxjs/operators';
import { InitializeService } from '../services/initialize.service';
import { ResponseStatusModel } from '../model/response-status-model';
import { AlertService } from '../services/alert.service';
import { HeaderService } from '../services/header.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    public router: Router,
    public initializeService: InitializeService,
    public authenticationService: AuthenticationService,
    public alertService: AlertService,
    public headerService: HeaderService
  ) { }

  private AUTH_HEADER = 'Authorization';
  private token;
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.headerService.toggleSpinner(true);

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

          // Globally Decrypt the response Logics
          // get Response body from - event.body
          // const modEvent = event.clone({ body: <decrypt rslt> });
          // return modEvent;

          if (event.body) {
            if (event.body.result) {
              if (event.body.result.status) {
                if (event.body.result.status === ResponseStatusModel.ERROR) {

                  if (event.body.result.errorCode) {

                    if (event.body.result.errorCode === '008') {
                      throw new HttpErrorResponse({
                        error: 'Invalid Token',
                        status: 401
                      });
                    } else if (event.body.result.errorCode === '007') {
                      this.authenticationService.isSessionTimeOut$.next(true);
                      setTimeout(() => {
                        this.authenticationService.isSessionTimeOut$.next(null);
                      }, 500);
                    } else {
                      if (event.body.result.errorMessage) {
                        this.alertService.open(ResponseStatusModel.ERROR, event.body.result.errorMessage);
                      }
                      // if (event.body.result.errorCode === '007' ||
                      //   event.body.result.errorCode === '008') {
                      //   setTimeout(() => {
                      //     this.headerService.toggleSpinner(false);
                      //   }, 100);
                      //   throw new HttpErrorResponse({
                      //     error: 'Invalid Token',
                      //     status: 401
                      //   });
                      // } else {
                      //   this.alertService.open(ResponseStatusModel.ERROR, event.body.result.errorMessage);
                      //   setTimeout(() => {
                      //     this.headerService.toggleSpinner(false);
                      //   }, 100);
                      // }
                    }
                  }
                }
              }
            }
          }
          setTimeout(() => {
            this.headerService.toggleSpinner(false);
          }, 100);
          return event;
        }
      }, finalize(() => { this.headerService.toggleSpinner(false); })),
      catchError((error: HttpErrorResponse) => {

        if (error && error.status === 401) {
          if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(req)))
            );
          } else {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);

            return this.refreshAccessToken().pipe(
              switchMap((success: any) => {

                if (success.result) {
                  if (success.result.status === ResponseStatusModel.SUCCESS) {
                    if (success.result.data) {
                      this.token = success.result.data.token;
                      this.refreshTokenSubject.next(success.result);
                      return next.handle(this.addAuthenticationToken(req));
                    }
                  } else {
                    this.authenticationService.clearLoggedInfo();
                    this.authenticationService.isLoggedIn$.next(false);
                    this.authenticationService.userInfo = null;
                    this.router.navigate(['/login']);
                  }
                }
              }),
              finalize(() => { this.refreshTokenInProgress = false; })
            );
          }
        } else {
          return throwError(error);
        }
      })
    );

  }

  private refreshAccessToken(): Observable<any> {
    return this.authenticationService.refreshToken();
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    // if (!this.token) {
    //   return request;
    // }

    // If you are calling an outside domain then do not add the token.
    // if (!request.url.match(/www.mydomain.com\//)) {
    //   return request;
    // }

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + this.token)
    });
  }

}
