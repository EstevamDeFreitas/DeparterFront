import { PerfilComponent } from './components/perfil/perfil.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../autentificacao/components/login/login.component";

const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'perfil',component: PerfilComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ConfiguracoesRoutingModule { }
