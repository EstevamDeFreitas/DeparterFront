import { AutentificacaoRoutingModule } from './autentificacao-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AutentificacaoRoutingModule,
    
  ]
})
export class AutentificacaoModule { }
