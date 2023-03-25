import { ModalExcluirDesativarComponent } from './../../../shared/components/modal-excluir-desativar/modal-excluir-desativar.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaDto } from './../../models/categoriaDto';
import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss']
})
export class ListaCategoriasComponent implements OnInit {

  public categorias: CategoriaDto[] = [];

  hasError = false;
  errorMessage = "";

  constructor(private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (res) => {
        this.categorias = res.data;
      },
      () => {},
      () => {
      }
    );
  }

  detalhesCategoria(id: string): void {
    this.router.navigate([`administracao/categorias/nova-categoria/${id}`]);
  }

  deletarCategoria(id: string) {

    this.categoriaService.deleteCategoria(id).subscribe(
      (res) => console.log(res.message),
      () => {},
      () => this.ngOnInit()
    );

  }

  openDialog(event: any, categoria: CategoriaDto){
    event.stopPropagation();
    const dialogRef = this.dialog.open(ModalExcluirDesativarComponent, {data: {title: "Excluir Categoria", message: `Deseja excluir a categoria ${categoria.nome}?`, confirm: "Confirmar", cancel:"Cancelar"}});

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result)
        this.deletarCategoria(categoria.id);

    })

  }


}
