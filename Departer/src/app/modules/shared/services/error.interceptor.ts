import { SnackBarTheme } from '../models/snackbat.theme.enum';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackbarComponent: SnackbarComponent) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        // Trata o erro aqui
        if (err.status === 0) {
          const message = 'Não foi possível se comunicar com o servidor. Tente novamente mais tarde.';
          this.snackbarComponent.openSnackBar(message, SnackBarTheme.error, 3000);
        } else {
          this.snackbarComponent.openSnackBar(err.error.message, SnackBarTheme.error, 3000);
        }
        return throwError(err);
      })
    );
  }
}
