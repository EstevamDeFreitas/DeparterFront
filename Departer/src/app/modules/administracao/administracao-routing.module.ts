import { CadastrarCategoriasComponent } from './components/cadastrar-categorias/cadastrar-categorias.component';
import { ListaCategoriasComponent } from './components/lista-categorias/lista-categorias.component';

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {path:'lista-categorias', component: ListaCategoriasComponent},
    {path:'nova-categoria', component: CadastrarCategoriasComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdministracaoRoutingModule { }
  