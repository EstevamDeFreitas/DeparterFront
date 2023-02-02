import { ReactiveFormsModule } from '@angular/forms';
import { AutentificacaoRoutingModule } from './autentificacao-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { EsqueceuSenhaEmailComponent } from './components/esqueceu-senha-email/esqueceu-senha-email.component';
import { EsqueceuSenhaNovaComponent } from './components/esqueceu-senha-nova/esqueceu-senha-nova.component';



@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    EsqueceuSenhaEmailComponent,
    EsqueceuSenhaNovaComponent
  ],
  imports: [
    CommonModule,
    AutentificacaoRoutingModule,
    ReactiveFormsModule,

  ]
})
export class AutentificacaoModule { }
