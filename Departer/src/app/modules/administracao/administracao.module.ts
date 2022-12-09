import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AdministracaoRoutingModule } from './administracao-routing.module';

import { ListaCategoriasComponent } from './components/lista-categorias/lista-categorias.component';
import { CadastrarCategoriasComponent } from './components/cadastrar-categorias/cadastrar-categorias.component';
import { AdministracaoComponent } from './components/administracao/administracao.component';


@NgModule({
  declarations: [
    ListaCategoriasComponent,
    CadastrarCategoriasComponent,
    AdministracaoComponent
  ],
  imports: [
    CommonModule,
    AdministracaoRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class AdministracaoModule { }
