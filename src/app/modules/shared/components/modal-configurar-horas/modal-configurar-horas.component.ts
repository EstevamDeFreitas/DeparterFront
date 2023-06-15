import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';
import { HorasService } from './../../../atividades/services/horas.service';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfiguracaoDeHoras, ConfiguracaoDeHorasPost } from 'src/app/modules/administracao/models/configuracaoDeHoras';
import { SnackBarTheme } from '../../models/snackbat.theme.enum';

@Component({
  selector: 'app-modal-configurar-horas',
  templateUrl: './modal-configurar-horas.component.html',
  styleUrls: ['./modal-configurar-horas.component.scss']
})
export class ModalConfigurarHorasComponent implements OnInit {

  postConfiguracao = {} as ConfiguracaoDeHorasPost;

  tipoConfiguracao: string = "";

  horasForm!: FormGroup;

  configuracao = {} as ConfiguracaoDeHoras;

  get f(): any {
    return this.horasForm.controls;
  }

  constructor(public dialogRef: MatDialogRef<ModalConfigurarHorasComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private horasService: HorasService, private snackbarComponent: SnackbarComponent) {
    this.postConfiguracao = data.configuracaoHoras;
    this.configuracao = data.configuracao;

    if (data.configuracaoHoras.tipoConfiguracao == 0)
      this.tipoConfiguracao = "Diárias"
    else
      this.tipoConfiguracao = "Mensais"

  }

  ngOnInit(): void {
    this.maskHour()
    this.formValidation();
  }

  public formValidation() {
    let valorParaHoras: string = "";

    if (this.configuracao != undefined)
      valorParaHoras = this.transformarMinutosEmHoras(this.configuracao.minutos);

    this.horasForm = new FormGroup({
      configHoras: new FormControl(valorParaHoras, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    });
  }

  maskHour() {
    // Mask Hour Input
    var input = document.querySelectorAll('#horas')[0];
    var hourInputMask = function hourInputMask(elm: any) {
      if (elm !== undefined) {
        elm.addEventListener('keypress', function (e: any) {
          if (e.keyCode < 47 || e.keyCode > 57) {
            e.preventDefault();
          }

          var len = elm.value.length;

          if (len !== 1 || len !== 3) {
            if (e.keyCode == 47) {
              e.preventDefault();
            }
          }

          if (len == 3 && e.keyCode > 53) {
            e.preventDefault();
          }


          if (len === 2) {
            elm.value += ':';
          }

        });
      }
    };
    hourInputMask(input);
  }

  finalizarConfiguracao() {

    if (this.horasForm.valid) {
      const configHorasValue = this.calcularHorasPrevistas(this.horasForm.get('configHoras')!.value);

      this.postConfiguracao.minutos = configHorasValue;

      if (this.configuracao != undefined) {

        let putConfig: ConfiguracaoDeHoras = {
          funcionarioId: this.postConfiguracao.funcionarioId,
          id: this.configuracao.id,
          minutos: configHorasValue,
          tipoConfiguracao: this.postConfiguracao.tipoConfiguracao
        }

        this.horasService.putHorasConfiguracao(putConfig).subscribe(
          () => {
            this.onConfirm("alterada");
          }
        )
      } else {
        this.horasService.postHorasConfiguracao(this.postConfiguracao).subscribe(
          () => {
            this.onConfirm("adicionada");
          }
        )
      }
    } else {
      this.snackbarComponent.openSnackBar("Preencha todo o formulário !", SnackBarTheme.error, 3000);
    }


  }

  public calcularHorasPrevistas(horas: string): number {
    let arrayHoras = horas.split('');

    let resultadoFinal = (+(arrayHoras[0] + arrayHoras[1]) * 60) + +(arrayHoras[3] + arrayHoras[4]);

    return resultadoFinal;
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

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

  onConfirm(mensagem: string): void {
    this.dialogRef.close(mensagem);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
