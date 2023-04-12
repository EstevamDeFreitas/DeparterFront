import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrincipalComponent } from './components/principal/principal.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModalExcluirDesativarComponent } from "./components/modal-excluir-desativar/modal-excluir-desativar.component";
import { MatButtonModule } from "@angular/material/button";
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { ModalAdicionarFuncionariosComponent } from './components/modal-adicionar-funcionarios/modal-adicionar-funcionarios.component';
import { ModalAdicionarCategoriaComponent } from './components/modal-adicionar-categoria/modal-adicionar-categoria.component';
import { ModalInformacoesComponent } from './components/modal-informacoes/modal-informacoes.component';
import { ResumoHorasComponent } from './components/resumo-horas/resumo-horas.component';
import { ResumoAtividadesComponent } from './components/resumo-atividades/resumo-atividades.component';
import { ModalAdicionarFuncionarioDepartamentoComponent } from './components/modal-adicionar-funcionario-departamento/modal-adicionar-funcionario-departamento.component';
import { ModalConfigurarHorasComponent } from './components/modal-configurar-horas/modal-configurar-horas.component';
import { ModalInformacaoNaoConfiguradoComponent } from './components/modal-informacao-nao-configurado/modal-informacao-nao-configurado.component';
import { GraficoAtividadesConcluidasComponent } from './components/grafico-atividades-concluidas/grafico-atividades-concluidas.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GraficoHorasCategoriasComponent } from './components/grafico-horas-categorias/grafico-horas-categorias.component';
import { ModalInformacoesModoAdminComponent } from './components/modal-informacoes-modo-admin/modal-informacoes-modo-admin.component';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [];

@NgModule({
    declarations: [
    PrincipalComponent,
    NavBarComponent,
    ModalExcluirDesativarComponent,
    SnackbarComponent,
    ModalAdicionarFuncionariosComponent,
    ModalAdicionarCategoriaComponent,
    ModalInformacoesComponent,
    ResumoHorasComponent,
    ResumoAtividadesComponent,
    ModalAdicionarFuncionarioDepartamentoComponent,
    ModalConfigurarHorasComponent,
    ModalInformacaoNaoConfiguradoComponent,
    GraficoAtividadesConcluidasComponent,
    GraficoHorasCategoriasComponent,
    ModalInformacoesModoAdminComponent,
  ],
    imports: [
      RouterModule.forChild(routes),
      CommonModule,
      MatIconModule,
      MatSidenavModule,
      MatDialogModule,
      MatToolbarModule,
      FormsModule,
      MatButtonModule,
      MatTabsModule,
      MatSnackBarModule,
      ReactiveFormsModule,
      NgApexchartsModule,
      MatPaginatorModule

    ],
    exports: [
     PrincipalComponent,
     CommonModule,
     NavBarComponent,
     MatIconModule,
     SnackbarComponent,
     ResumoHorasComponent,
     ResumoAtividadesComponent,
     GraficoAtividadesConcluidasComponent,
     GraficoHorasCategoriasComponent
    ],
    entryComponents: [

    ],
    providers: [SnackbarComponent]
  })
  export class SharedModule { }
