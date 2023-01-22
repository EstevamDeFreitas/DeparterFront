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
  atividadesCategorias: CategoriaDto[] = [];
  atividadesFuncionarios: FuncionarioDto[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private atividadeService: AtividadeService, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.carregarTodasCategorias();
  }


  getAtividades() {
    this.atividadeService.getAtividades().subscribe(
      (res) => {
        this.atividades = res.data;

        this.atividades.forEach(atividade => {

          atividade.categorias = [];
          atividade.atividadeCategorias.forEach(atividadeCategoria => {
            for (const categoriaArray of this.allCategorias) {
              if (atividadeCategoria.categoriaId == categoriaArray.id) {
                atividade.categorias.push(categoriaArray);
              }
            }
          });

          
        });
        console.log(this.atividades);
      },
      () => { }
    )
  }


  carregarTodasCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (res) => {
        this.allCategorias = res.data;

        this.getAtividades();
      },
      (err) => {

      },
      () => {
      }
    );
  }

  novaAtividade() {
    this.router.navigate(['/atividades/nova-atividade']);
  }

  irAtividade(id: string) {
    this.router.navigate([`/atividades/atividade/${id}`]);
  }

}
