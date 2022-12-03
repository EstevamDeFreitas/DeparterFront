import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './components/perfil/perfil.component';



@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    ConfiguracoesRoutingModule
  ]
})
export class ConfiguracoesModule { }
