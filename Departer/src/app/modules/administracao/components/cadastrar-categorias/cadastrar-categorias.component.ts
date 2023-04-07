import { SnackBarTheme } from './../../../shared/models/snackbat.theme.enum';
import { SnackbarComponent } from './../../../shared/components/snackbar/snackbar.component';
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

  cores: Array<string> = [
    "#5245E0",
    "#45E067",
    "#B845E0",
  ];

  cores2: Array<string> = [
    "#E04545",
    "#E0B545",
    "#4596E0",
  ];

  corAtual: string = this.cores[0];

  estadoFormulario = "post";
  tituloFormulario = "Nova Categoria";

  hasError = false;
  errorMessage = "";

  get f(): any {
    return this.categoriaForm.controls;
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private readonly snackbarComponent: SnackbarComponent) { }

  ngOnInit(): void {
    this.carregarCategoria();
    this.formValidation();
  }

  public formValidation() {
    this.categoriaForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
    });
  }

  public carregarCategoria(): void {
    const categoriaIdParam = this.route.snapshot.paramMap.get('id');

    if (categoriaIdParam !== null) {
      this.estadoFormulario = "put";

      this.tituloFormulario = "Editar Categoria";

      this.categoriaService.getCategoriaById(categoriaIdParam).subscribe(
        (res) => {
          this.categoria = { ...res.data }
          this.categoriaForm.patchValue(this.categoria);
          this.corAtual = this.categoria.cor;
        },
        () => {},
        () => { }
      )
    }
  }

  public cadastrarCategoria(): void {

    if (this.categoriaForm.valid) {

      this.categoria = (this.estadoFormulario === 'post')
        ? { ... this.categoriaForm.value }
        : { id: this.categoria.id, ... this.categoriaForm.value };

        this.categoria.cor = this.corAtual;


      if (this.estadoFormulario === 'post') {
        this.categoriaService.postCategoria(this.categoria).subscribe(
          (res) => {
            this.snackbarComponent.openSnackBar("Categoria adicionada com sucesso !",SnackBarTheme.success,3000);
          },
          () => {},
          () => {
            this.irParaCategorias();
          }
        )
      } else {
        this.categoriaService.putCategoria(this.categoria).subscribe(
          (res) => {
            this.snackbarComponent.openSnackBar("Categoria alterada com sucesso !",SnackBarTheme.success,3000);
          },
          () => {},
          () => {
            this.irParaCategorias();
          }
        )
      }

    } else {
      //Colocar alerta
    }

  }

  public alterarCor(cor: string){
    this.corAtual = cor;
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

  public irParaCategorias(): void {
    this.router.navigate(['/administracao/categorias']);
  }

  public limparForm(): void {
    this.categoriaForm.reset();
    this.f.nome.value = "";
    this.corAtual = "#F9C5C5"
  }

}
