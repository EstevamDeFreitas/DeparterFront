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
    private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (res) => {
        this.categorias = res.data;
      },
      (err) => {
        this.hasError = true;
        this.errorMessage = err.error.message;
      },
      () => {
      }
    );
  }

  detalhesCategoria(id: string): void {
    this.router.navigate([`administracao/categorias/nova-categoria/${id}`]);
  }

  deletarCategoria(event: any, id: string) {
    event.stopPropagation();

    this.categoriaService.deleteCategoria(id).subscribe(
      (res) => console.log(res.message),
      (err) => {
        this.hasError = true;
        this.errorMessage = err.error.message;
      },
      () => this.ngOnInit()
    );

  }


}
