import { DepartamentoService } from './../../../departamentos/services/departamento.service';
import { FuncionarioService } from './../../../configuracoes/services/funcionario.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionarioDto } from './../../models/funcionarioDto';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-modal-adicionar-funcionario-departamento',
  templateUrl: './modal-adicionar-funcionario-departamento.component.html',
  styleUrls: ['./modal-adicionar-funcionario-departamento.component.scss']
})
export class ModalAdicionarFuncionarioDepartamentoComponent implements OnInit {

  public funcionarios: FuncionarioDto[] = [];
  public funcionariosFiltrados: FuncionarioDto[] = [];

  public funcionariosResult: FuncionarioDto[] = [];
  public funcionariosJaAdicionados: FuncionarioDto[] = [];

  public imagemPadrao = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';

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

  constructor(public dialogRef: MatDialogRef<ModalAdicionarFuncionarioDepartamentoComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private funcionarioService: FuncionarioService, private departamentoService: DepartamentoService) {
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
