import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaDepartamentosComponent } from './components/lista-departamentos/lista-departamentos.component';
import { NovoDepartamentoComponent } from './components/novo-departamento/novo-departamento.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { TelaDepartamentosComponent } from './components/tela-departamentos/tela-departamentos.component';



@NgModule({
  declarations: [
    ListaDepartamentosComponent,
    NovoDepartamentoComponent,
    TelaDepartamentosComponent
  ],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule
  ]
})
export class DepartamentosModule { }
