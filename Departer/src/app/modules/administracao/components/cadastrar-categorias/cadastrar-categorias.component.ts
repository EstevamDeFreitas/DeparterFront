import { CategoriaDto } from './../../models/categoriaDto';
import { CategoriaService } from './../../services/categoria.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-categorias',
  templateUrl: './cadastrar-categorias.component.html',
  styleUrls: ['./cadastrar-categorias.component.scss']
})
export class CadastrarCategoriasComponent implements OnInit {

  categoriaForm!: FormGroup;
  categoria = {} as CategoriaDto;

  estadoFormulario = "post";

  hasError = false;
  errorMessage = "";

  get f(): any {
    return this.categoriaForm.controls;
  }

  constructor(private router: Router, private route: ActivatedRoute, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.carregarCategoria();
    this.formValidation();
  }

  public formValidation() {
    this.categoriaForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cor: new FormControl('', [Validators.required]),
    });
  }

  public carregarCategoria(): void {
    const categoriaIdParam = this.route.snapshot.paramMap.get('id');

    if (categoriaIdParam !== null) {
      this.estadoFormulario = "put";

      this.categoriaService.getCategoriaById(categoriaIdParam).subscribe(
        (res) => {
          this.categoria = { ...res.data }
          this.categoriaForm.patchValue(this.categoria);
        },
        (err) => {
          this.hasError = true;
          this.errorMessage = err.error.message;
        },
        () => { }
      )
    }
  }

  public cadastrarCategoria(): void {

    if (this.categoriaForm.valid) {

      this.categoria = (this.estadoFormulario === 'post')
        ? { ... this.categoriaForm.value }
        : { id: this.categoria.id, ... this.categoriaForm.value };


      if (this.estadoFormulario === 'post') {
        this.categoriaService.postCategoria(this.categoria).subscribe(
          (res) => { },
          (err) => {
            this.hasError = true;
            this.errorMessage = err.error.message;
          },
          () => {
            this.irParaCategorias();
          }
        )
      } else {
        this.categoriaService.putCategoria(this.categoria).subscribe(
          (res) => { },
          (err) => {
            this.hasError = true;
            this.errorMessage = err.error.message;
          },
          () => {
            this.irParaCategorias();
          }
        )
      }

    } else {
      //Colocar alerta
    }

  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

  public irParaCategorias(): void {
    this.router.navigate(['/administracao/categorias']);
  }

  public limparForm(): void {
    this.categoriaForm.reset();
    this.f.cor.value = "";
  }

}
