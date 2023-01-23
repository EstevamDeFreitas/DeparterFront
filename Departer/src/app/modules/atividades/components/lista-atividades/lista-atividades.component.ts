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

  atividades: AtividadeListDto[] = [];

  allCategorias: CategoriaDto[] = [];
  allFuncionarios: FuncionarioDto[] = []

  atividadesCategorias: CategoriaDto[] = [];
  atividadesFuncionarios: FuncionarioDto[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private atividadeService: AtividadeService, private categoriaService: CategoriaService, private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.getAllFuncionarios();
  }


  getAtividades() {
    this.atividadeService.getAtividades().subscribe(
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
