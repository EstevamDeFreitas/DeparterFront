import { EditarDepartamentoComponent } from './components/editar-departamento/editar-departamento.component';
import { DetalhesDepartamentosComponent } from './components/detalhes-departamentos/detalhes-departamentos.component';
import { TelaDepartamentosComponent } from './components/tela-departamentos/tela-departamentos.component';
import { NovoDepartamentoComponent } from './components/novo-departamento/novo-departamento.component';
import { ListaDepartamentosComponent } from './components/lista-departamentos/lista-departamentos.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../autentificacao/components/login/login.component";

const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'lista-departamentos',component: ListaDepartamentosComponent},
    {path:'novo-departamento',component: NovoDepartamentoComponent},
    {path:'geral-departamentos/:id',component: TelaDepartamentosComponent},
    {path:'detalhes-departamentos/:id', component: DetalhesDepartamentosComponent},
    {path:'editar-departamento/:id', component: EditarDepartamentoComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class DepartamentosRoutingModule { }
