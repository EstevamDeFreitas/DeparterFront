import { FuncionarioService } from './../../../configuracoes/services/funcionario.service';
import { CategoriaService } from './../../../administracao/services/categoria.service';
import { FuncionarioDto } from './../../../shared/models/funcionarioDto';
import { CategoriaDto } from './../../../administracao/models/categoriaDto';
import { AtividadeDto } from './../../models/atividadeDto';
import { AtividadeService } from './../../services/atividade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {

  atividadeId: string = "";
  atividade = {} as AtividadeDto;
  horasPrevistasEmString: string = "";

  categorias: CategoriaDto[] = [];
  funcionarios: FuncionarioDto[] = [];


  constructor(private router: Router, private route: ActivatedRoute, private atividadeService: AtividadeService, private categoriaService: CategoriaService, private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.getAtividade();
  }

  getAtividade(): void {
    this.atividadeId = this.route.snapshot.paramMap.get('id')!;

    if (this.atividadeId != null) {
      this.atividadeService.getAtividadeById(this.atividadeId).subscribe(
        (res) => {
          this.atividade = res.data;
          console.log(this.atividade);

          this.getCategorias();
          this.getFuncionarios();

          this.horasPrevistasEmString = this.transformarMinutosEmHoras(this.atividade.tempoPrevisto);
        },
        () => { },
      )
    }
  }

  getCategorias(): void {
    this.atividade.atividadeCategorias.forEach(e => {
      this.categoriaService.getCategoriaById(e.categoriaId).subscribe(
        (res) => {
          this.categorias.push(res.data);
        },
        () => { }
      )
    })

  }

  getFuncionarios(): void {
    this.atividade.atividadeFuncionarios.forEach(e => {
      this.funcionarioService.getFuncionarioById(e.funcionarioId).subscribe(
        (res) => {
          this.funcionarios.push(res.data);
        },
        () => { }
      )
    })
  }

  public transformarMinutosEmHoras(minutosPrevistos: number): string {

    let horas: number | string = Math.floor(minutosPrevistos / 60);
    let minutos: number | string = minutosPrevistos % 60;

    if (horas <= 9) {
      horas = "" + 0 + horas;
    }

    if (minutos <= 9) {
      minutos = "" + 0 + minutos;
    }

    return '' + horas + ':' + minutos;

  }

  public editar() {
    this.router.navigate([`/atividades/editar-atividade/${this.atividadeId}`]);
  }

  public adicionarAtividadeFilho() {
    this.router.navigate([`/atividades/nova-atividade/${this.atividadeId}`]);
  }

}
