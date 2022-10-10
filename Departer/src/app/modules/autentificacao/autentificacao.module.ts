import { AutentificacaoRoutingModule } from './autentificacao-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';



@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    AutentificacaoRoutingModule,
    
  ]
})
export class AutentificacaoModule { }
