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
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authorization = `Bearer ${this.authService.getToken()}`;
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: authorization
      }
    });
    return next.handle(modifiedRequest);
  }
  
}
