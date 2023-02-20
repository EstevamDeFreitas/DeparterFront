
import { DepartamentoService } from './../../services/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DepartamentoDto } from '../../models/departamentoDto';
import { FuncionarioDto } from 'src/app/modules/shared/models/funcionarioDto';
import { DepartamentoFuncionariosDto } from 'src/app/modules/shared/models/departamentoFuncionariosDto';
import { AtividadeDto, GetAtividadeByDepartamentoId } from '../../models/atividadeDto';

@Component({
  selector: 'app-tela-departamentos',
  templateUrl: './tela-departamentos.component.html',
  styleUrls: ['./tela-departamentos.component.scss']
})
export class TelaDepartamentosComponent implements OnInit {

  idDepartamento: string = "";
  maximoHorasDiarias: string = "";
  maximoHorasMensais: string = "";
  departamento?: DepartamentoDto;
  funcionariosLista: DepartamentoFuncionariosDto[] = [];
  atividades: GetAtividadeByDepartamentoId[] = [];

  constructor(private router: Router,private route: ActivatedRoute,private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(x=>{
      this.idDepartamento = x[`id`];
    });

    this.carregarDepartamento();
    
  }

  carregarDepartamento(){

    this.departamentoService.getDepartamentoById(this.idDepartamento).subscribe({
      next: (response) => {

        this.departamento = response.data;

        this.funcionariosLista = this.departamento.departamentoFuncionarios;

        this.maximoHorasDiarias = this.transformarMinutosEmHoras(response.data.maximoHorasDiarias);
        this.maximoHorasMensais = this.transformarMinutosEmHoras(response.data.maximoHorasMensais);
      },
      error: (response) => {
      }
    })

    this.departamentoService.getAtividadesbyDepartamentoId(this.idDepartamento).subscribe({
      next: (response) => {

        this.atividades = response.data;

       
      },
      error: (response) => {
      }
    })
  }

    
  public transformarMinutosEmHoras(minutosPrevistos: number): string {

    let horas: number | string = Math.floor(minutosPrevistos / 60);
    let minutos: number | string = minutosPrevistos % 60;

    if (horas <= 9) {
      horas = "" + 0 + horas;
    }

    if (minutos <= 9) {
      minutos = "" + 0 + minutos;
    }

    return '' + horas + ':' + minutos;

  }

  detalhesDepartamento(id: string){
    this.router.navigate([`/departamentos/detalhes-departamentos/${id}`]);
  }
  irAtividade(id: string) {
    this.router.navigate([`/atividades/atividade/${id}`]);
  }

}
