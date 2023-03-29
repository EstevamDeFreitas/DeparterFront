import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrincipalComponent } from './components/principal/principal.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
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
      MatSnackBarModule
    ],
    exports: [
     PrincipalComponent,
     CommonModule,
     NavBarComponent,
     MatIconModule,
     SnackbarComponent,
     ResumoHorasComponent,
     ResumoAtividadesComponent
    ],
    entryComponents: [

    ],
    providers: [SnackbarComponent]
  })
  export class SharedModule { }
