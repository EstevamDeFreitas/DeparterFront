import { AuthGuard } from './modules/shared/guard/auth.guard';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './modules/shared/components/nav-bar/nav-bar.component';

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "autenticacao/login" },
    { path: '', loadChildren: () => import('./modules/autentificacao/autentificacao.module').then(m => m.AutentificacaoModule) },
    { path: 'home', component: NavBarComponent, loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
    { path: 'atividades', component: NavBarComponent, loadChildren: () => import('./modules/atividades/atividades.module').then(m => m.AtividadesModule), canActivate: [AuthGuard] },
    { path: 'administracao', component: NavBarComponent, loadChildren: () => import('./modules/administracao/administracao.module').then(m => m.AdministracaoModule), canActivate: [AuthGuard] },
    { path: 'configuracoes', component: NavBarComponent, loadChildren: () => import('./modules/configuracoes/configuracoes.module').then(m=>m.ConfiguracoesModule), canActivate: [AuthGuard]},
    { path: 'departamentos', component: NavBarComponent, loadChildren: () => import('./modules/departamentos/departamentos.module').then(m=>m.DepartamentosModule), canActivate: [AuthGuard]},
    { path: 'horas', component: NavBarComponent, loadChildren: () => import('./modules/horas/horas.module').then(m=>m.HorasModule), canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
