import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getToken() != null && this.authService.getToken()){
      const httpRequest = request.clone()
      httpRequest.headers.set('authorization',`bearer ${ this.authService.getToken() }`)
      return next.handle(httpRequest);
    }else{
      (error : HttpErrorResponse ) => {
        if (error.status == 401) {
            if (this.authService.getTimeToken() < 0){
              this.authService.logout();
            }
            this.router.navigate(['/login']);
        }
      }
      return EMPTY;
    }
  }
}
