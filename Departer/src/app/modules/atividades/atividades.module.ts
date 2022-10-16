import { AtividadesRoutingModule } from './atividades-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAtividadesComponent } from './components/lista-atividades/lista-atividades.component';
import { NovaAtividadeComponent } from './components/nova-atividade/nova-atividade.component';
import { EditarAtividadeComponent } from './components/editar-atividade/editar-atividade.component';
import { AtividadeComponent } from './components/atividade/atividade.component';



@NgModule({
  declarations: [
    ListaAtividadesComponent,
    NovaAtividadeComponent,
    EditarAtividadeComponent,
    AtividadeComponent
  ],
  imports: [
    CommonModule,
    AtividadesRoutingModule
  ]
})
export class AtividadesModule { }
