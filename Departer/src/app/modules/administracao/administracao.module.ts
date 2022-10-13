import { AdministracaoRoutingModule } from './administracao-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCategoriasComponent } from './components/lista-categorias/lista-categorias.component';
import { CadastrarCategoriasComponent } from './components/cadastrar-categorias/cadastrar-categorias.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    ListaCategoriasComponent,
    CadastrarCategoriasComponent
  ],
  imports: [
    CommonModule,
    AdministracaoRoutingModule,
    MatIconModule,
    MatSidenavModule
  ]
})
export class AdministracaoModule { }
