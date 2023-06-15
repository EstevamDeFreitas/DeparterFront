import { SharedModule } from './../shared/shared.module';
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
import { ModalAdicionarChecklistComponent } from './components/modal-adicionar-checklist/modal-adicionar-checklist.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ListaAtividadesComponent,
    NovaAtividadeComponent,
    EditarAtividadeComponent,
    AtividadeComponent,
    ModalAdicionarChecklistComponent,
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
    ReactiveFormsModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class AtividadesModule { }
