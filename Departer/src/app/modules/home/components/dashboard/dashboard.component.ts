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

  @Output() funcionarioId: string = "";

  funcionario!: FuncionarioDto;
  nomeFunc: string = "";

  constructor(private router: Router,private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {

    this.getUser();

  }

  public getUser(): void {
    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) => {
        this.funcionario = res.data;
        this.nomeFunc = this.funcionario.nome;
        this.funcionarioId = this.funcionario.id;
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
