import { FuncionarioDto } from 'src/app/modules/shared/models/funcionarioDto';
import { FuncionarioService } from 'src/app/modules/configuracoes/services/funcionario.service';
import { Router } from '@angular/router';
import { AtividadeListDto } from './../../../atividades/models/atividadeDto';
import { AtividadeService } from './../../../atividades/services/atividade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumo-atividades',
  templateUrl: './resumo-atividades.component.html',
  styleUrls: ['./resumo-atividades.component.scss']
})
export class ResumoAtividadesComponent implements OnInit {

  public atividades: AtividadeListDto[] = [];
  allFuncionarios: FuncionarioDto[] = []

  constructor(private atividadeService: AtividadeService, private router: Router, private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.getAllFuncionarios();
  }

  public getAtividade(){
    this.atividadeService.getAtividades().subscribe(
      (res) => {

        this.atividades = res.data;

        this.atividades.forEach(atividade => {

          atividade.funcionarios = [];
          atividade.atividadeFuncionarios.forEach(atividadeFuncionario => {
            atividade.funcionarios.push(this.insertFuncionario(atividadeFuncionario.funcionarioId));
          });

        });

        console.log(this.atividades)

      },
      () => {}
    )
  }

  getAllFuncionarios(): void {
    this.funcionarioService.getAll().subscribe(
      (res) => {
        this.allFuncionarios = res.data

        this.getAtividade();
      },
      (err) => {

      }
    )
  }

  insertFuncionario(atividadeFuncionarioId: string): FuncionarioDto {
    let resultado = {} as FuncionarioDto;

    for (const funcionario of this.allFuncionarios) {
      if (atividadeFuncionarioId == funcionario.id) {
        resultado = funcionario;
      }
    }

    return resultado;
  }

  irAtividade(id: string) {
    this.router.navigate([`/atividades/atividade/${id}`]);
  }

}
