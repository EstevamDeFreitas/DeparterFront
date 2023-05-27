import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!(request.method === 'POST' && request.body instanceof FormData)) {
    request = request.clone({
      setHeaders:{
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${AuthService.getToken()}`,
      }
    })
  } else {
    request = request.clone({
      setHeaders:{
        'Authorization': `Bearer ${AuthService.getToken()}`,
      }
    })
  }

    return next.handle(request);
  }
}


