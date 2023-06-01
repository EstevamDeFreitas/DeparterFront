import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ModalEditarPerfilImgComponent } from './components/modal-editar-perfil-img/modal-editar-perfil-img.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    PerfilComponent,
    ModalEditarPerfilImgComponent
  ],
  imports: [
    CommonModule,
    ConfiguracoesRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class ConfiguracoesModule { }
