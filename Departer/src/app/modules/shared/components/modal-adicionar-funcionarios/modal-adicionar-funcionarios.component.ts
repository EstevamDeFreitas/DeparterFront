import { DepartamentoService } from './../../../departamentos/services/departamento.service';
import { DepartamentoFuncionariosDto } from 'src/app/modules/shared/models/departamentoFuncionariosDto';
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

  public funcionariosDepartamento: DepartamentoFuncionariosDto[] = [];
  public funcionariosFiltrados: DepartamentoFuncionariosDto[] = [];

  public funcionariosResult: FuncionarioDto[] = [];
  public funcionariosJaAdicionados: FuncionarioDto[] = [];

  public imagemPadrao = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';


  public departamentoId: string = "";

  private _filtroLista: string = "";

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.funcionariosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.funcionariosDepartamento;
  }

  public filtrarEventos(filtrarPor: string): DepartamentoFuncionariosDto[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.funcionariosDepartamento.filter(
      (element: any) => element.funcionario.apelido.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(public dialogRef: MatDialogRef<ModalAdicionarFuncionariosComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private funcionarioService: FuncionarioService, private departamentoService: DepartamentoService) {
    this.funcionariosJaAdicionados = data.funcionariosLista;
    this.departamentoId = data.departamentoId;
  }

  ngOnInit(): void {
    this.carregarDepartamento();
  }


  carregarDepartamento(){

    this.departamentoService.getDepartamentoById(this.departamentoId).subscribe({
      next: (response) => {
        this.funcionariosDepartamento = response.data.departamentoFuncionarios;

        for (let funcionario of this.funcionariosJaAdicionados) {

          let funcionarioASerExcluido = this.funcionariosDepartamento.find(element => element.funcionarioId === funcionario.id);

          if(funcionarioASerExcluido != undefined) {
            let index = this.funcionariosDepartamento.map(e=>e.funcionarioId).indexOf(funcionarioASerExcluido.funcionarioId);
            this.funcionariosDepartamento.splice(index, 1);
          }

        }
        console.log(this.funcionariosDepartamento)
        this.funcionariosFiltrados = this.funcionariosDepartamento;

      }
    })
  }

  public changeNoCheckbox(evento: any, funcionario: FuncionarioDto) {
    if (evento.target.checked) {
      this.funcionariosResult.push(funcionario);
    } else {
      let index = this.funcionariosResult.map(e => e.id).indexOf(funcionario.id);
      this.funcionariosResult.splice(index, 1);
    }
  }

  public substituirImagem(evento: Event): void {
    const imagem = evento.target as HTMLImageElement;
    imagem.onerror = null;
    imagem.src = this.imagemPadrao;
  }


  onConfirm(): void {
    this.dialogRef.close(this.funcionariosResult);
  }

  onCancel(): void {
    this.dialogRef.close([]);
  }

}
