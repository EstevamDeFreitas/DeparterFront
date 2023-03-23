import { ResumoDto } from './../../../atividades/models/resumoDto';
import { FuncionarioService } from './../../../configuracoes/services/funcionario.service';
import { HorasService } from './../../../atividades/services/horas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumo-horas',
  templateUrl: './resumo-horas.component.html',
  styleUrls: ['./resumo-horas.component.scss']
})
export class ResumoHorasComponent implements OnInit {

  funcionarioId: string = "";
  horasResumo = {} as ResumoDto;

  constructor(private horasService: HorasService, private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.getFuncionario();
  }

  public getFuncionario(): void{
    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) => {
        this.funcionarioId = res.data.id;
        this.getResumo();
      },
      (err) => {}
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

  public getResumo(): void{
    this.horasService.getResumoHoras(this.funcionarioId).subscribe(
      (res) =>{
        this.horasResumo = res.data;
        console.log(this.horasResumo);
      },
      () =>{}
    )
  }


}
