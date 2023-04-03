import { ResumoDto } from './../../../atividades/models/resumoDto';
import { HorasGetByFuncionarioDto } from './../../../atividades/models/horasDto';
import { FuncionarioService } from 'src/app/modules/configuracoes/services/funcionario.service';
import { HorasService } from './../../../atividades/services/horas.service';
import { Component, OnInit } from '@angular/core';
import { ResumoHorasComponent } from 'src/app/modules/shared/components/resumo-horas/resumo-horas.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horas-usuario',
  templateUrl: './horas-usuario.component.html',
  styleUrls: ['./horas-usuario.component.scss']
})
export class HorasUsuarioComponent implements OnInit {

  funcionarioId: string = "";
  horas: HorasGetByFuncionarioDto[] = [];
  horasResumo = {} as ResumoDto;

  ordemData: 'asc' | 'desc' = 'desc';
  ordemMinutos: 'asc' | 'desc' = 'desc';
  ordemAtual: string = 'data';

  constructor(private horasService: HorasService, private funcionarioService: FuncionarioService, private router: Router) { }

  ngOnInit(): void {
    this.getFuncionario()
  }

  public getFuncionario(): void{
    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) => {
        this.funcionarioId = res.data.id;
        this.getHorasFuncionario();
      },
      (err) => {}
    )
  }

  public getHorasFuncionario(): void{
    this.horasService.getHorasByfuncionarioId(this.funcionarioId).subscribe(
      (res) => {
        this.horas = res.data;
        console.log(this.horas);

        this.horas.sort((a, b) => {
          const dateA = new Date(a.dataCriacao);
          const dateB = new Date(b.dataCriacao);
          return dateB.getTime() - dateA.getTime();
        });
      },
      () => {}
    )
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

    return '' + horas + 'h ' + minutos + 'm';

  }

  public ordenarPorDataOuMinutos(tipoOrdem: string): void {
    if (this.horas.length === 0) return;

    this.ordemAtual = tipoOrdem;

    if (this.ordemAtual === 'data') {
      if (this.ordemData === 'desc') {
        this.horas.sort((a, b) => new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime());
        this.ordemData = 'asc';
      } else {
        this.horas.sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());
        this.ordemData = 'desc';
      }
    } else if (this.ordemAtual === 'minutos') {
      if (this.ordemMinutos === 'desc') {
        this.horas.sort((a, b) => b.minutos - a.minutos);
        this.ordemMinutos = 'asc';
      } else {
        this.horas.sort((a, b) => a.minutos - b.minutos);
        this.ordemMinutos = 'desc';
      }
    }
  }

  irAtividade(id: string) {
    this.router.navigate([`/atividades/atividade/${id}`]);
  }

}
