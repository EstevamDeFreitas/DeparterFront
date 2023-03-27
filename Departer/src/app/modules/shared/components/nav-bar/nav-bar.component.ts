import { SnackBarTheme } from './../../models/snackbat.theme.enum';
import { SnackbarComponent } from './../snackbar/snackbar.component';
import { ModoAdminService } from './../../services/modo-admin.service';
import { Router } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/modules/configuracoes/services/funcionario.service';
import { FuncionarioDto } from '../../models/funcionarioDto';
import { CommonTasksService } from '../../services/common-tasks.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  funcionario!: FuncionarioDto;

  opened: boolean = true;
  modoAdmin: boolean = true;

  userImg: string = "";

  constructor(private router: Router, private modoAdminService: ModoAdminService, private readonly snackbarComponent: SnackbarComponent, 
    private funcionarioService: FuncionarioService, private commonTasksService: CommonTasksService) { }

  ngOnInit(): void {
    this.commonTasksService.imagemAtualizada$.subscribe(
      imagem => {
        this.userImg = imagem;
      }
    );
    this.modoAdmin = this.modoAdminService.modoAdmin;
    console.log(this.modoAdmin);
    this.getUser();
  }

  
  public getUser(): void {
    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) => {
        this.funcionario = res.data;
        this.userImg = this.funcionario.imagem;
      },
      (err) => {
        
      }
    )
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
