import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AdministracaoRoutingModule } from './administracao-routing.module';

import { ListaCategoriasComponent } from './components/lista-categorias/lista-categorias.component';
import { CadastrarCategoriasComponent } from './components/cadastrar-categorias/cadastrar-categorias.component';
import { AdministracaoComponent } from './components/administracao/administracao.component';
import { ConfiguracaoHorasComponent } from './components/configuracao-horas/configuracao-horas.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ListaCategoriasComponent,
    CadastrarCategoriasComponent,
    AdministracaoComponent,
    ConfiguracaoHorasComponent
  ],
  imports: [
    CommonModule,
    AdministracaoRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class AdministracaoModule { }
