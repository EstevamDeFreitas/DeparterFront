import { AuthInterceptor } from './modules/autentificacao/services/auth.interceptor';
import { AuthService } from './modules/autentificacao/services/auth.service';
import { SharedModule } from './modules/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarComponent } from './modules/shared/components/snackbar/snackbar.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule

  ],
  providers: [SnackbarComponent, AuthService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},{provide: MAT_DATE_LOCALE, useValue: 'pt-br'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
