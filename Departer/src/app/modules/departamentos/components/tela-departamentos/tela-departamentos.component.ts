import { ModoAdminService } from './../../../shared/services/modo-admin.service';

import { DepartamentoService } from './../../services/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DepartamentoDto } from '../../models/departamentoDto';
import { FuncionarioDto } from 'src/app/modules/shared/models/funcionarioDto';
import { DepartamentoFuncionariosDto } from 'src/app/modules/shared/models/departamentoFuncionariosDto';
import { AtividadeDto, GetAtividadeByDepartamentoId } from '../../models/atividadeDto';

@Component({
  selector: 'app-tela-departamentos',
  templateUrl: './tela-departamentos.component.html',
  styleUrls: ['./tela-departamentos.component.scss']
})
export class TelaDepartamentosComponent implements OnInit {

  idDepartamento: string = "";
  maximoHorasDiarias: string = "";
  maximoHorasMensais: string = "";
  departamento?: DepartamentoDto;
  funcionariosLista: DepartamentoFuncionariosDto[] = [];
  atividades: GetAtividadeByDepartamentoId[] = [];

  modoAdmin: boolean = false;

  public imagemPadrao = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';

  constructor(private router: Router,private route: ActivatedRoute,private departamentoService: DepartamentoService, private modoAdminService:ModoAdminService) { }

  ngOnInit(): void {
    this.route.params.subscribe(x=>{
      this.idDepartamento = x[`id`];
    });

    this.modoAdminService.modoAdmin$.subscribe(
      modoAdmin => {
        this.modoAdmin = modoAdmin;
        this.carregarDepartamento();
      }
    );

  }

  carregarDepartamento(){

    this.departamentoService.getDepartamentoById(this.idDepartamento, this.modoAdmin).subscribe({
      next: (response) => {

        this.departamento = response.data;

        this.funcionariosLista = this.departamento.departamentoFuncionarios;
        console.log(this.funcionariosLista);

        this.maximoHorasDiarias = this.transformarMinutosEmHoras(response.data.maximoHorasDiarias);
        this.maximoHorasMensais = this.transformarMinutosEmHoras(response.data.maximoHorasMensais);
      },
      error: (response) => {
      }
    })

    this.departamentoService.getAtividadesbyDepartamentoId(this.idDepartamento).subscribe({
      next: (response) => {

        this.atividades = response.data;


      },
      error: (response) => {
      }
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

  public substituirImagem(evento: Event): void {
    const imagem = evento.target as HTMLImageElement;
    imagem.onerror = null;
    imagem.src = this.imagemPadrao;
  }

  detalhesDepartamento(id: string){
    this.router.navigate([`/departamentos/detalhes-departamentos/${id}`]);
  }
  irAtividade(id: string) {
    this.router.navigate([`/atividades/atividade/${id}`]);
  }

}
