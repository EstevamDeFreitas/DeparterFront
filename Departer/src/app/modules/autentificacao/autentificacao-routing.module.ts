import { EsqueceuSenhaNovaComponent } from './components/esqueceu-senha-nova/esqueceu-senha-nova.component';
import { EsqueceuSenhaEmailComponent } from './components/esqueceu-senha-email/esqueceu-senha-email.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'cadastro', component: CadastroComponent},
    {path:'nova-senha-email', component: EsqueceuSenhaEmailComponent},
    {path:'nova-senha-confirmar', component: EsqueceuSenhaNovaComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AutentificacaoRoutingModule { }
