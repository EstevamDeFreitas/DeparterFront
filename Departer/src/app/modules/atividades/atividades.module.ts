import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AtividadesRoutingModule } from './atividades-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAtividadesComponent } from './components/lista-atividades/lista-atividades.component';
import { NovaAtividadeComponent } from './components/nova-atividade/nova-atividade.component';
import { EditarAtividadeComponent } from './components/editar-atividade/editar-atividade.component';
import { AtividadeComponent } from './components/atividade/atividade.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalAdicionarCategoriaComponent } from './components/modal-adicionar-categoria/modal-adicionar-categoria.component';
import { ModalInformacoesComponent } from './components/modal-informacoes/modal-informacoes.component';


@NgModule({
  declarations: [
    ListaAtividadesComponent,
    NovaAtividadeComponent,
    EditarAtividadeComponent,
    AtividadeComponent,
    ModalAdicionarCategoriaComponent,
    ModalInformacoesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AtividadesRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class AtividadesModule { }
