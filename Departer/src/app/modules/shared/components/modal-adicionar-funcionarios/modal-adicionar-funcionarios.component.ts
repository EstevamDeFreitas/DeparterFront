import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FuncionarioService } from "src/app/modules/configuracoes/services/funcionario.service";
import { FuncionarioDto } from "../../models/funcionarioDto";

@Component({
  selector: 'app-modal-adicionar-funcionarios',
  templateUrl: './modal-adicionar-funcionarios.component.html',
  styleUrls: ['./modal-adicionar-funcionarios.component.scss']
})
export class ModalAdicionarFuncionariosComponent implements OnInit {

  hasError = false;
  errorMessage = "";

  public funcionarios: FuncionarioDto[] = [];
  public funcionariosFiltrados: FuncionarioDto[] = [];

  public funcionariosResult: FuncionarioDto[] = [];
  public funcionariosJaAdicionados: FuncionarioDto[] = [];

  private _filtroLista: string = "";

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.funcionariosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.funcionarios;
  }

  public filtrarEventos(filtrarPor: string): FuncionarioDto[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.funcionarios.filter(
      (funcionario: any) => funcionario.apelido.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(public dialogRef: MatDialogRef<ModalAdicionarFuncionariosComponent>, @Inject(MAT_DIALOG_DATA) public data: FuncionarioDto[], private funcionarioService: FuncionarioService) {
    this.funcionariosJaAdicionados = data;
  }

  ngOnInit(): void {
    this.getFuncionarios();
  }

  getFuncionarios(): void {
    this.funcionarioService.getAll().subscribe(result => {

      let funcionarioResponse = result.data;

        for (let funcionario of this.funcionariosJaAdicionados) {

          let funcionarioASerExcluido = funcionarioResponse.find(element => element.id === funcionario.id);

          if(funcionarioASerExcluido != undefined) {
            let index = funcionarioResponse.map(e=>e.id).indexOf(funcionarioASerExcluido.id);
            funcionarioResponse.splice(index, 1);
          }

        }
        this.funcionarios = funcionarioResponse;
        this.funcionariosFiltrados = this.funcionarios;
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
