import { Router } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  opened: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {

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


}
