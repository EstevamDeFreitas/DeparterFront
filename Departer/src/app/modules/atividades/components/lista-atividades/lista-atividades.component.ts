import { ModoAdminService } from './../../../shared/services/modo-admin.service';
import { FuncionarioService } from './../../../configuracoes/services/funcionario.service';
import { CategoriaService } from './../../../administracao/services/categoria.service';
import { AtividadeCategorias } from './../../models/atividadeCategorias';
import { FuncionarioDto } from './../../../shared/models/funcionarioDto';
import { CategoriaDto } from './../../../administracao/models/categoriaDto';
import { AtividadeListDto } from './../../models/atividadeDto';
import { AtividadeService } from './../../services/atividade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-atividades',
  templateUrl: './lista-atividades.component.html',
  styleUrls: ['./lista-atividades.component.scss']
})
export class ListaAtividadesComponent implements OnInit {

  public atividades: AtividadeListDto[] = [];
  public atividadesFiltradas: AtividadeListDto[] = [];

  allCategorias: CategoriaDto[] = [];
  allFuncionarios: FuncionarioDto[] = []

  atividadesCategorias: CategoriaDto[] = [];
  atividadesFuncionarios: FuncionarioDto[] = [];

  modoAdmin: boolean = false;

  tipoDeFiltro: string = "titulo";

  private _filtroLista: string = "";

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.atividadesFiltradas = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.atividades;
  }

  public filtrarEventos(filtrarPor: string): AtividadeListDto[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    let atividadesFiltradas = [] as AtividadeListDto[];

    if (this.tipoDeFiltro == "titulo") {
      atividadesFiltradas = this.atividades.filter(
        atividade => atividade.titulo.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
    } else if (this.tipoDeFiltro == "categoria") {
      atividadesFiltradas = this.atividades.filter(atividade => {
        return atividade.categorias.some(cat => cat.nome.toLowerCase().includes(filtrarPor));
      });
    } else if (this.tipoDeFiltro == "funcionario"){
      atividadesFiltradas = this.atividades.filter(atividade => {
        return atividade.funcionarios.some(func => func.apelido.toLowerCase().includes(filtrarPor));
      });
    }

    return atividadesFiltradas;

  }

  constructor(private router: Router, private route: ActivatedRoute, private atividadeService: AtividadeService, private categoriaService: CategoriaService, private funcionarioService: FuncionarioService, private modoAdminService: ModoAdminService) { }

  ngOnInit(): void {
    this.modoAdminService.modoAdmin$.subscribe(
      modoAdmin => {
        this.modoAdmin = modoAdmin;
        this.getAllFuncionarios();
      }
    );
  }

  public substituirImagem(evento: Event): void {
    const imagem = evento.target as HTMLImageElement;
    imagem.onerror = null;
    imagem.src = "../../../../../assets/images/default-image.png";
  }

  mudarTipoDeFiltro(tipoDeFiltro: string) {
    this.tipoDeFiltro = tipoDeFiltro;
  }

  getAtividades() {

    this.atividadeService.getAtividades(this.modoAdmin).subscribe(
      (res) => {
        this.atividades = res.data;

        this.atividades.forEach(atividade => {

          atividade.categorias = [];
          atividade.atividadeCategorias.forEach(atividadeCategoria => {
            atividade.categorias.push(this.insertCategoria(atividadeCategoria.categoriaId));
          });

          atividade.funcionarios = [];
          atividade.atividadeFuncionarios.forEach(atividadeFuncionario => {
            atividade.funcionarios.push(this.insertFuncionario(atividadeFuncionario.funcionarioId));
          });

        });
        console.log(this.atividades);
        this.atividadesFiltradas = this.atividades;
      },
      () => { }
    )
  }

  getAllFuncionarios(): void {
    this.funcionarioService.getAll().subscribe(
      (res) => {
        this.allFuncionarios = res.data

        this.getAllCategorias();
      },
      (err) => {

      }
    )
  }

  getAllCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (res) => {
        this.allCategorias = res.data;

        this.getAtividades();
      },
      (err) => {

      }
    );
  }

  insertCategoria(atividadeCategoriaId: string): CategoriaDto {
    let resultado = {} as CategoriaDto;

    for (const categoria of this.allCategorias) {
      if (atividadeCategoriaId == categoria.id) {
        resultado = categoria;
      }
    }

    return resultado;
  }

  insertFuncionario(atividadeFuncionarioId: string): FuncionarioDto {
    let resultado = {} as FuncionarioDto;

    for (const funcionario of this.allFuncionarios) {
      if (atividadeFuncionarioId == funcionario.id) {
        resultado = funcionario;
      }
    }

    return resultado;
  }

  novaAtividade() {
    this.router.navigate(['/atividades/nova-atividade']);
  }

  irAtividade(id: string) {
    this.router.navigate([`/atividades/atividade/${id}`]);
  }

}
