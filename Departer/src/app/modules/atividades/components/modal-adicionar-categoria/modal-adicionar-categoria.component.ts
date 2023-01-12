import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaDto } from './../../../administracao/models/categoriaDto';
import { CategoriaService } from './../../../administracao/services/categoria.service';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';

@Component({
  selector: 'app-modal-adicionar-categoria',
  templateUrl: './modal-adicionar-categoria.component.html',
  styleUrls: ['./modal-adicionar-categoria.component.scss']
})
export class ModalAdicionarCategoriaComponent implements OnInit {

  hasError = false;
  errorMessage = "";

  public categoriaPrimeiraMetade: CategoriaDto[] = [];
  public categoriaSegundaMetade: CategoriaDto[] = [];

  public categoriaSelecionadaAtual!: HTMLElement;
  public categoriasResult: CategoriaDto[] = [];
  public categoriasJaAdicionadas: CategoriaDto[] = [];


  constructor(public dialogRef: MatDialogRef<ModalAdicionarCategoriaComponent>, @Inject(MAT_DIALOG_DATA) public data: CategoriaDto[], private categoriaService: CategoriaService) {
    this.categoriasJaAdicionadas = data;
    console.log(this.categoriasJaAdicionadas);
  }

  ngOnInit(): void {
    this.getCategoria();
  }

  public getCategoria(): void {
    this.categoriaService.getCategorias().subscribe(
      (res) => {
        let categoriaResponse = res.data;

        //Os 2 for servem para comparar as categorias que ja estao presentes na tela nova-atividade com todas as categorias do sistema, mais abaixo eh feito um splice para remover as categorias que ja estao presentes para nao haver categorias repetidas.
        for (let categoria of this.categoriasJaAdicionadas) {

          let objASerExcluido = categoriaResponse.find(element => element.id === categoria.id);

          if(objASerExcluido != undefined) {
            let index = categoriaResponse.map(e=>e.id).indexOf(objASerExcluido.id);
            categoriaResponse.splice(index, 1);
          }

        }

        const meioDoArray = Math.ceil(categoriaResponse.length / 2);
        this.categoriaPrimeiraMetade = categoriaResponse.splice(0, meioDoArray);
        this.categoriaSegundaMetade = categoriaResponse.splice(-meioDoArray);

      },
      (err) => {
        this.hasError = true;
        this.errorMessage = err.error.message;
      },
    )
  }


  public selecionarCategoria(index: number, flag: number, categoria: CategoriaDto) {
    if (flag === 1)
      this.categoriaSelecionadaAtual = document.getElementById(`categoriaPrimeiraMetade${index}`) as HTMLElement;
    else
      this.categoriaSelecionadaAtual = document.getElementById(`categoriaSegundaMetade${index}`) as HTMLElement;


    if (this.categoriasResult.find(e => e.id === categoria.id)) {
      let index = this.categoriasResult.map(e=>e.id).indexOf(categoria.id);
      this.categoriasResult.splice(index, 1);
      this.categoriaSelecionadaAtual.style.border = ""
    } else {
      this.categoriaSelecionadaAtual.style.border = "1px solid black"
      this.categoriasResult.push(categoria);
    }

  }

  onConfirm(): void {
    this.dialogRef.close(this.categoriasResult);
  }

  onCancel(): void {
    this.dialogRef.close([]);
  }

}
