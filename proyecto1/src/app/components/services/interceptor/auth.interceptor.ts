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
    const httpRequest = request.clone();
    let authorization = `bearer ${ this.authService.getToken() }`
    httpRequest.headers.set('authorization', authorization);
    return next.handle(httpRequest);
  }
  
}
