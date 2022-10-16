import { AtividadeComponent } from './components/atividade/atividade.component';
import { EditarAtividadeComponent } from './components/editar-atividade/editar-atividade.component';
import { NovaAtividadeComponent } from './components/nova-atividade/nova-atividade.component';
import { ListaAtividadesComponent } from './components/lista-atividades/lista-atividades.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {path:'lista-atividades', component: ListaAtividadesComponent},
    {path:'atividade',component: AtividadeComponent},
    {path:'nova-atividade', component: NovaAtividadeComponent},
    {path:'editar-atividade',component: EditarAtividadeComponent}
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AtividadesRoutingModule { }
  