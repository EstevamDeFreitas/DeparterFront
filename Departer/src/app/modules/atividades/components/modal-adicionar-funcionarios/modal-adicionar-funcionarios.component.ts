import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuncionarioDto } from './../../../shared/models/funcionarioDto';
import { FuncionarioService } from './../../../configuracoes/services/funcionario.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-modal-adicionar-funcionarios',
  templateUrl: './modal-adicionar-funcionarios.component.html',
  styleUrls: ['./modal-adicionar-funcionarios.component.scss']
})
export class ModalAdicionarFuncionariosComponent implements OnInit {

  hasError = false;
  errorMessage = "";

  public funcionarios: FuncionarioDto[] = [];
  public funcionariosResult: FuncionarioDto[] = [];
  public funcionariosJaAdicionados: FuncionarioDto[] = [];

  constructor(public dialogRef: MatDialogRef<ModalAdicionarFuncionariosComponent>, @Inject(MAT_DIALOG_DATA) public data: FuncionarioDto[], private funcionarioService: FuncionarioService) {
    this.funcionariosJaAdicionados = data;
  }

  ngOnInit(): void {
    this.getFuncionarios();
  }

  getFuncionarios(): void {
    this.funcionarioService.getAll().subscribe(result => {

      let funcionarioResponse = result.data;

      console.log(funcionarioResponse)
      console.log(this.funcionariosJaAdicionados)


        for (let funcionario of this.funcionariosJaAdicionados) {

          let funcionarioASerExcluido = funcionarioResponse.find(element => element.id === funcionario.id);

          if(funcionarioASerExcluido != undefined) {
            let index = funcionarioResponse.map(e=>e.id).indexOf(funcionarioASerExcluido.id);
            funcionarioResponse.splice(index, 1);
          }

        }
        this.funcionarios = funcionarioResponse;
    });
  }

  public changeNoCheckbox(evento: any, funcionario: FuncionarioDto) {
    if (evento.target.checked) {
      this.funcionariosResult.push(funcionario);
    } else {
      let index = this.funcionariosResult.map(e => e.id).indexOf(funcionario.id);
      this.funcionariosResult.splice(index, 1);
    }
  }


  onConfirm(): void {
    this.dialogRef.close(this.funcionariosResult);
  }

  onCancel(): void {
    this.dialogRef.close([]);
  }

}
