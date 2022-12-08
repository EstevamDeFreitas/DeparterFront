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

  constructor(private router: Router, private route: ActivatedRoute, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      (res) => {
        this.categorias = res.data;
        console.log(this.categorias)
      },
      (err) => {
        this.hasError = true;
        this.errorMessage = err.error.message;
      },
      () => {
      }
    );
  }

  cadastrarCategoria() {
    this.router.navigate(['/administracao/categorias/nova-categoria']);
  }


}
