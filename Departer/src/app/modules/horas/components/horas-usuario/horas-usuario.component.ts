import { HorasGetByFuncionarioDto } from './../../../atividades/models/horasDto';
import { FuncionarioService } from 'src/app/modules/configuracoes/services/funcionario.service';
import { HorasService } from './../../../atividades/services/horas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horas-usuario',
  templateUrl: './horas-usuario.component.html',
  styleUrls: ['./horas-usuario.component.scss']
})
export class HorasUsuarioComponent implements OnInit {

  funcionarioId: string = "";
  horas: HorasGetByFuncionarioDto[] = [];

  constructor(private horasService: HorasService, private funcionarioService: FuncionarioService) { }

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

}
