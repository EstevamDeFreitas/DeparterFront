import { CategoriaService } from './../../../administracao/services/categoria.service';
import { AtividadeCategorias } from './../../models/atividadeCategorias';
import { FuncionarioDto } from './../../../shared/models/funcionarioDto';
import { CategoriaDto } from './../../../administracao/models/categoriaDto';
import { AtividadeDto } from './../../models/atividadeDto';
import { AtividadeService } from './../../services/atividade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-atividades',
  templateUrl: './lista-atividades.component.html',
  styleUrls: ['./lista-atividades.component.scss']
})
export class ListaAtividadesComponent implements OnInit {

  atividades: AtividadeDto[] = [];
  atividadesCategorias: CategoriaDto[] = [];
  atividadesFuncionarios: FuncionarioDto[] = [];

  constructor(private router: Router,private route: ActivatedRoute, private atividadeService: AtividadeService, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getAtividades();
  }

  getAtividades(){
    this.atividadeService.getAtividades().subscribe(
      (res) =>{
        this.atividades = res.data;
        console.log(this.atividades);

        this.atividades.forEach(atividade => {
          this.adicionarCategorias(atividade.atividadeCategorias);
        })


      },
      () =>{}
    )
  }

  adicionarCategorias(categorias: AtividadeCategorias[]){

    categorias.forEach(categoria => {
      let result: any = [];

      this.categoriaService.getCategoriaById(categoria.categoriaId).subscribe(
        (res) => {
          result.push(res.data);
        },
        () => {}
      )

      console.log(result)

    })
  }

  novaAtividade(){
    this.router.navigate(['/atividades/nova-atividade']);
  }

  irAtividade(id: string){
    this.router.navigate([`/atividades/atividade/${id}`]);
  }

}
