import { SnackBarTheme } from './../../models/snackbat.theme.enum';
import { SnackbarComponent } from './../snackbar/snackbar.component';
import { ModoAdminService } from './../../services/modo-admin.service';
import { Router } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  opened: boolean = true;
  modoAdmin: boolean = true;

  constructor(private router: Router, private modoAdminService: ModoAdminService, private readonly snackbarComponent: SnackbarComponent) { }

  ngOnInit(): void {
    this.modoAdmin = this.modoAdminService.modoAdmin;
    console.log(this.modoAdmin);
  }

  sideAbreFecha() {

    if(this.opened = true){
      this.opened = false;
    }else{
      this.opened= true;
    }
  }

  public irParaHoras(): void {
    this.router.navigate(["/horas"]);
  }

  public irParaAtividades(): void {
    this.router.navigate(["/atividades/lista-atividades"]);
  }

  public irParaDepartamentos(): void {
    this.router.navigate(["/departamentos/lista-departamentos"]);
  }

  public irParaAdministracao(): void {
    this.router.navigate(["/administracao/administracao"]);
  }

  public irParaPerfil(): void {
    this.router.navigate(["/configuracoes/perfil"]);
  }

  public logoff(): void {
    this.router.navigate([""]);
  }

  public irParaDashboard(): void {
    this.router.navigate(["/home/dashboard"]);
  }

  alternarModoAdmin() {
    this.modoAdminService.alterarModoAdmin(!this.modoAdmin);
    this.modoAdmin = this.modoAdminService.modoAdmin;

    if(this.modoAdmin)
      this.snackbarComponent.openSnackBar("Modo Administrador está ativado !",SnackBarTheme.success,3000);
    else
      this.snackbarComponent.openSnackBar("Modo Administrador está desativado !",SnackBarTheme.success,3000);
  }


}
