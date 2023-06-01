import { ModoAdminService } from './../../../shared/services/modo-admin.service';

import { DepartamentoService } from './../../services/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { DepartamentoDto } from '../../models/departamentoDto';
import { FuncionarioDto } from 'src/app/modules/shared/models/funcionarioDto';
import { DepartamentoFuncionariosDto } from 'src/app/modules/shared/models/departamentoFuncionariosDto';
import { AtividadeDto, GetAtividadeByDepartamentoId } from '../../models/atividadeDto';
import { FuncionarioService } from 'src/app/modules/configuracoes/services/funcionario.service';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

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
  atividadesPaginadas: GetAtividadeByDepartamentoId[] = [];

  public environment = environment;

  loading: boolean = false;
  modoAdmin: boolean = false;

  pageSize = 3;
  pageSizeOptions: number[] = [3];

  @Output() funcionarioId: string = "";
  @Output() departamentoId: string = "";

  funcionarioAtual!: FuncionarioDto;

  constructor(private router: Router, private route: ActivatedRoute, private departamentoService: DepartamentoService, private modoAdminService: ModoAdminService,
    private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      this.idDepartamento = x[`id`];
      this.departamentoId = this.idDepartamento;
      console.log(this.departamentoId)
    });

    this.funcionarioService.getFuncionarioLogado().subscribe({
      next: (response) => {
        this.funcionarioAtual = response.data;
        this.funcionarioId = this.funcionarioAtual.id;

        this.modoAdminService.modoAdmin$.subscribe(
          modoAdmin => {
            this.modoAdmin = modoAdmin;
            this.carregarDepartamento();
          }
        );

        console.log(this.funcionarioId)

        this.carregarDepartamento();
      },
      error: (response) => {
      }
    });

  }



  carregarDepartamento() {

    
    this.loading=true;

    this.departamentoService.getDepartamentoById(this.idDepartamento, this.modoAdmin).subscribe({
      next: (response) => {

        this.departamento = response.data;
        console.log(this.departamento)

        this.atividades = this.departamento.atividades;
        console.log(this.atividades)

        this.funcionariosLista = this.departamento.departamentoFuncionarios;
        console.log(this.funcionariosLista);

        this.atividades.sort((a, b) => {
          const dateA = new Date(a.dataEntrega);
          const dateB = new Date(b.dataEntrega);
          return dateA.getTime() - dateB.getTime();
        });

        this.atividadesPaginadas = this.atividades;

        const defaultPage = {
          pageIndex: 0,
          pageSize: this.pageSize,
          length: this.atividades.length
        };

        this.onPageChange(defaultPage);

        //this.maximoHorasDiarias = this.transformarMinutosEmHoras(response.data.maximoHorasDiarias);
        //this.maximoHorasMensais = this.transformarMinutosEmHoras(response.data.maximoHorasMensais);
        
        this.loading=false;
      },
      error: (response) => {
        this.loading=false;
      }
    })

  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.atividadesPaginadas = this.atividades.slice(startIndex, endIndex);
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
    imagem.src = "../../../../../assets/images/default-image.png";
  }

  getNomeStatusAtividade(status: number): string {
    switch (status) {
      case 0:
        return 'Pendente';
      case 1:
        return 'Desenvolvendo';
      case 2:
        return 'Concluída';
      case 3:
        return 'Atrasada';
      default:
        return '';
    }
  }

  getCorStatusAtividade(status: number): string {
    switch (status) {
      case 0:
        return '#FF9900';
      case 1:
        return '#4596E0';
      case 2:
        return '#35DA3B';
      case 3:
        return '#FF3A3A';
      default:
        return '';
    }
  }


  detalhesDepartamento(id: string) {
    this.router.navigate([`/departamentos/detalhes-departamentos/${id}`]);
  }
  irAtividade(id: string) {
    this.router.navigate([`/atividades/atividade/${id}`]);
  }

}
