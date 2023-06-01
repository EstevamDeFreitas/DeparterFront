import { ModoAdminService } from './../../../shared/services/modo-admin.service';
import { FuncionarioService } from './../../../configuracoes/services/funcionario.service';
import { CategoriaService } from './../../../administracao/services/categoria.service';
import { AtividadeCategorias } from './../../models/atividadeCategorias';
import { FuncionarioDto } from './../../../shared/models/funcionarioDto';
import { CategoriaDto } from './../../../administracao/models/categoriaDto';
import { AtividadeListDto } from './../../models/atividadeDto';
import { AtividadeService } from './../../services/atividade.service';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MudarCorFonteService } from 'src/app/modules/shared/services/mudar-cor-fonte.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-atividades',
  templateUrl: './lista-atividades.component.html',
  styleUrls: ['./lista-atividades.component.scss']
})
export class ListaAtividadesComponent implements OnInit {

  public atividades: AtividadeListDto[] = [];
  public atividadesFiltradas: AtividadeListDto[] = [];
  public environment = environment;

  allCategorias: CategoriaDto[] = [];
  allFuncionarios: FuncionarioDto[] = []

  atividadesCategorias: CategoriaDto[] = [];
  atividadesFuncionarios: FuncionarioDto[] = [];

  modoAdmin: boolean = false;
  loading: boolean = false;

  ordemData: 'asc' | 'desc' = 'asc';
  ordemAtual: string = 'data';

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
    } else if (this.tipoDeFiltro === "status") {
      const statusNum = this.mapearStatusParaNumero(filtrarPor);
      atividadesFiltradas = this.atividades.filter(atividade => atividade.statusAtividade === statusNum);
    }

    return atividadesFiltradas;

  }

  constructor(private router: Router, private route: ActivatedRoute, private atividadeService: AtividadeService, private categoriaService: CategoriaService, private funcionarioService: FuncionarioService, private modoAdminService: ModoAdminService, public mudarCorFonteService: MudarCorFonteService) { }

  funcionario!: FuncionarioDto;


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

    this.loading=true;
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

        this.atividades.sort((a, b) => {
          const dateA = new Date(a.dataEntrega);
          const dateB = new Date(b.dataEntrega);
          return dateA.getTime() - dateB.getTime();
        });

        this.atividadesFiltradas = this.atividades;
        
        this.loading=false;
      },
      () => {
        this.loading=false; }
    )
  }

  getAllFuncionarios(): void {
    
    this.loading=true;
    this.funcionarioService.getAll().subscribe(
      (res) => {
        this.allFuncionarios = res.data

        this.getAllCategorias();
      
      },
      (err) => {
        this.loading=false;
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
        
        this.loading=false;
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

  public ordenarPorData(tipoOrdem: string): void {
    if (this.atividadesFiltradas.length === 0) return;

    this.ordemAtual = tipoOrdem;

    if (this.ordemAtual === 'data') {
      if (this.ordemData === 'desc') {
        this.atividadesFiltradas.sort((a, b) => new Date(a.dataEntrega).getTime() - new Date(b.dataEntrega).getTime());
        this.ordemData = 'asc';
      } else {
        this.atividadesFiltradas.sort((a, b) => new Date(b.dataEntrega).getTime() - new Date(a.dataEntrega).getTime());
        this.ordemData = 'desc';
      }
    }
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

  private mapearStatusParaNumero(status: string): number {
    const statusOptions: any = {
      pendente: 0,
      desenvolvendo: 1,
      concluida: 2,
      atrasada: 3,
    };

    for (const option in statusOptions) {
      if (option.includes(status)) {
        return statusOptions[option];
      }
    }

    return -1;
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

  novaAtividade() {
    this.router.navigate(['/atividades/nova-atividade']);
  }

  irAtividade(id: string) {
    this.router.navigate([`/atividades/atividade/${id}`]);
  }

}
