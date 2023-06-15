import { Router } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { FuncionarioService } from 'src/app/modules/configuracoes/services/funcionario.service';
import { FuncionarioDto } from 'src/app/modules/shared/models/funcionarioDto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  funcionario!: FuncionarioDto;
  nomeFunc: string = "";
  loading: boolean = false;

  constructor(private router: Router,private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {

    this.getUser();

  }

  public getUser(): void {
    this.loading=true;
    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) => {
        this.funcionario = res.data;
        this.nomeFunc = this.funcionario.nome;
        this.loading=false;
      }
    )
  }

  public irParaAtividades(): void {
    this.router.navigate(["/atividades/lista-atividades"]);
  }

  public irParaHoras(): void {
    this.router.navigate(["/horas"]);
  }

}
