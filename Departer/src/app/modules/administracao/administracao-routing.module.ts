import { AdministracaoComponent } from './components/administracao/administracao.component';
import { CadastrarCategoriasComponent } from './components/cadastrar-categorias/cadastrar-categorias.component';
import { ListaCategoriasComponent } from './components/lista-categorias/lista-categorias.component';

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'categorias', children: [
      { path: '', component: ListaCategoriasComponent },
      { path: 'nova-categoria', component: CadastrarCategoriasComponent },
      { path: `nova-categoria/:id`, component: CadastrarCategoriasComponent },
    ]
  },
  { path: 'administracao', component: AdministracaoComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracaoRoutingModule { }
