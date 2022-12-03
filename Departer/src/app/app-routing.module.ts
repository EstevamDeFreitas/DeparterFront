import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './modules/shared/components/nav-bar/nav-bar.component';

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "autenticacao/login" },
    { path: '', loadChildren: () => import('./modules/autentificacao/autentificacao.module').then(m => m.AutentificacaoModule) },
    { path: 'home', component: NavBarComponent, loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
    { path: 'atividades', component: NavBarComponent, loadChildren: () => import('./modules/atividades/atividades.module').then(m => m.AtividadesModule) },
    { path: 'administracao', component: NavBarComponent, loadChildren: () => import('./modules/administracao/administracao.module').then(m => m.AdministracaoModule) },
    { path: 'configuracoes', component: NavBarComponent, loadChildren: () => import('./modules/configuracoes/configuracoes.module').then(m=>m.ConfiguracoesModule)},
    { path: 'departamentos', component: NavBarComponent, loadChildren: () => import('./modules/departamentos/departamentos.module').then(m=>m.DepartamentosModule)},
    { path: '**', redirectTo: '/' }
];

/* Exemplo de lazy Loading
const routes: Routes = [
    { path: '', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
    { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
    { path: 'configuracoes', loadChildren: () => import('./modules/management/management.module').then(m => m.ManagementModule) },
    { path: 'clientes', loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule) },
    { path: 'parametros', loadChildren: () => import('./modules/parameter/parameter.module').then(m => m.ParameterModule) },
    { path: 'borderos', loadChildren: () => import('./modules/bordero/bordero.module').then(m => m.BorderoModule) },
    { path: 'propostas', loadChildren: () => import('./modules/proposal/proposal.module').then(m => m.ProposalModule) },
    { path: 'financeiro', loadChildren: () => import('./modules/billing/billing.module').then(m => m.BillingModule) },
    { path: '**', redirectTo: '/' }
];*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
