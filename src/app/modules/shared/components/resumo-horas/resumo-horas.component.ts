import { ResumoDto } from './../../../atividades/models/resumoDto';
import { FuncionarioService } from './../../../configuracoes/services/funcionario.service';
import { HorasService } from './../../../atividades/services/horas.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalInformacaoNaoConfiguradoComponent } from '../modal-informacao-nao-configurado/modal-informacao-nao-configurado.component';
import { ModoAdminService } from '../../services/modo-admin.service';

@Component({
  selector: 'app-resumo-horas',
  templateUrl: './resumo-horas.component.html',
  styleUrls: ['./resumo-horas.component.scss']
})
export class ResumoHorasComponent implements OnInit {

  funcionarioId: string = "";
  horasResumo = {} as ResumoDto;

  modoAdmin: boolean = false;

  @Input() departamentoId: string = "";

  constructor(private horasService: HorasService, private funcionarioService: FuncionarioService, public dialog: MatDialog, private modoAdminService: ModoAdminService) {
    this.horasResumo = {
      mediaMensalMinutos: 0,
      minutosMesPassado: 0,
      minutosMesVigente: 0,
      minutosMesRestantes: 0,
      minutosHoje: 0,
      minutosHojeRestantes: 0
    };
  }

  ngOnInit(): void {

    this.modoAdminService.modoAdmin$.subscribe(
      modoAdmin => {
        this.modoAdmin = modoAdmin;

        if(this.modoAdmin == false){
          this.getFuncionario();
        } else {
          this.getResumo("", this.departamentoId)
        }


      }
    );

  }

  public getFuncionario(): void{
    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) => {
        this.funcionarioId = res.data.id;
        this.getResumo(this.funcionarioId, this.departamentoId);
      },
      (err) => {}
    )
  }

  public getResumo(funcionarioId?: string, departamentoId?: string): void{
    this.horasService.getResumoHoras(funcionarioId, departamentoId).subscribe(
      (res) =>{
        this.horasResumo = res.data;
      },
      () =>{}
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

  public openInfoDialog() {

    const dialogConfig = new MatDialogConfig();

    this.dialog.open(ModalInformacaoNaoConfiguradoComponent, dialogConfig);
  }



}
