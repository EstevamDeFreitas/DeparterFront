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

  constructor(private router: Router, private modoAdminService: ModoAdminService) { }

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

  public irParaDashboard(): void {
    this.router.navigate(["/home/dashboard"]);
  }

  alternarModoAdmin() {
    this.modoAdminService.alterarModoAdmin(!this.modoAdmin);
    this.modoAdmin = this.modoAdminService.modoAdmin;
  }


}
