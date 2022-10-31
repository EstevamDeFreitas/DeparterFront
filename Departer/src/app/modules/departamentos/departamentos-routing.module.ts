import { NovoDepartamentoComponent } from './components/novo-departamento/novo-departamento.component';
import { ListaDepartamentosComponent } from './components/lista-departamentos/lista-departamentos.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../autentificacao/components/login/login.component";

const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'lista-departamentos',component: ListaDepartamentosComponent},
    {path:'novo-departamento',component: NovoDepartamentoComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class DepartamentosRoutingModule { }
