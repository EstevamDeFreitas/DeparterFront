import { ModoAdminService } from './../../../shared/services/modo-admin.service';
import { DepartamentoService } from './../../../departamentos/services/departamento.service';
import { HorasPostDto } from './../../models/horasDto';
import { HorasService } from './../../services/horas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarComponent } from './../../../shared/components/snackbar/snackbar.component';
import { SnackBarTheme } from './../../../shared/models/snackbat.theme.enum';
import { ChecklistDto } from './../../models/checklistDto';
import { ModalAdicionarChecklistComponent } from './../modal-adicionar-checklist/modal-adicionar-checklist.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
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
  funcionarioAtual = {} as FuncionarioDto;

  horasForm!: FormGroup;
  estadoHoras = false;

  atividadeHoras: string = "";
  funcionarioHoras: string = "";

  departamentoNome: string = "";

  modoAdmin: boolean = false;
  pertenceAAtividade: boolean = false;

  get f(): any {
    return this.horasForm.controls;
  }

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private atividadeService: AtividadeService, private categoriaService: CategoriaService, private funcionarioService: FuncionarioService, private readonly snackbarComponent: SnackbarComponent,
    private horasService: HorasService, private departamentoService: DepartamentoService, private modoAdminService: ModoAdminService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.atividadeId = params['id'];

      this.modoAdminService.modoAdmin$.subscribe(
        modoAdmin => {
          this.modoAdmin = modoAdmin;
          this.getAtividade(this.modoAdmin);
        }
      );
    });

    this.getFuncionarioAtual();
    this.maskHour();
    this.formValidation();

  }

  public getAtividade(modoAdmin: boolean): void {

    if (this.atividadeId != null) {
      this.atividadeService.getAtividadeById(this.atividadeId, modoAdmin).subscribe(
        (res) => {
          this.atividade = res.data;
          console.log(this.atividade);

          this.getCategorias();
          this.getFuncionarios();
          this.getAtividadeHoras();
          this.getDepartamentoNome();

          this.horasPrevistasEmString = this.transformarMinutosEmHoras(this.atividade.tempoPrevisto);
        },
        () => { },
      )
    }
  }

  public getCategorias(): void {
    this.categorias = [];
    this.atividade.atividadeCategorias.forEach(e => {
      this.categoriaService.getCategoriaById(e.categoriaId).subscribe(
        (res) => {
          this.categorias.push(res.data);
        },
        () => { }
      )
    })

  }

  public getFuncionarios(): void {
    this.funcionarios = [];
    this.atividade.atividadeFuncionarios.forEach(e => {
      this.funcionarioService.getFuncionarioById(e.funcionarioId).subscribe(
        (res) => {
          this.funcionarios.push(res.data);
        },
        () => { }
      )
    })
  }

  public getAtividadeHoras() {
    this.horasService.getHorasByAtividadeId(this.atividadeId).subscribe(
      (res) => {
        let contadorDeMinutos = 0;
        res.data.forEach(x => {
          contadorDeMinutos += x.minutos;
        })
        this.atividadeHoras = this.transformarMinutosEmHoras(contadorDeMinutos);
        this.atualizarBarraDeProgresso();
      },
      (err) => { },
    )
  }

  getDepartamentoNome(): void {
    this.departamentoService.getDepartamentoById(this.atividade.departamentoId, this.modoAdmin).subscribe(
      (res) => {
        this.departamentoNome = res.data.nome;
      },
      () => { }
    )
  }

  public getFuncionarioAtual(): void {
    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) => {
        this.funcionarioAtual = res.data;

        this.getFuncionarioHoras();
      },
      () => { }
    )
  }

  public getFuncionarioHoras(): void {
    this.horasService.getHorasByfuncionarioIdAndAtividadeId(this.funcionarioAtual.id, this.atividadeId).subscribe(
      (res) => {
        let contadorDeMinutos = 0;
        res.data.forEach(x => {
          contadorDeMinutos += x.minutos;
        })
        this.funcionarioHoras = this.transformarMinutosEmHoras(contadorDeMinutos);
      },
      () => { }
    )
  }

  public atualizarBarraDeProgresso(): void {
    let porcentagem = (this.calcularHorasPrevistas(this.atividadeHoras) / this.atividade.tempoPrevisto) * 100;

    if (porcentagem > 100) {
      porcentagem = 100;
    }

    const tagPorcentagem = document.querySelector('#percentage') as HTMLElement;
    tagPorcentagem.innerHTML = `${Math.round(porcentagem)}%`;

    const barraDeProgresso = document.querySelector('.progress-bar-bigger div') as HTMLElement;
    barraDeProgresso.style.width = `${porcentagem}%`;
  }

  public formValidation() {
    this.horasForm = new FormGroup({
      minutos: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    });
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

  public calcularHorasPrevistas(horas: string): number {
    let arrayHoras = horas.split('');

    let resultadoFinal = (+(arrayHoras[0] + arrayHoras[1]) * 60) + +(arrayHoras[3] + arrayHoras[4]);

    return resultadoFinal;
  }

  public maskHour() {
    var input = document.querySelectorAll('#horas')[0];
    var hourInputMask = function hourInputMask(elm: any) {
      if (elm !== undefined) {
        elm.addEventListener('keypress', function (e: any) {
          if (e.keyCode < 47 || e.keyCode > 57) {
            e.preventDefault();
          }

          var len = elm.value.length;

          if (len !== 1 || len !== 3) {
            if (e.keyCode == 47) {
              e.preventDefault();
            }
          }

          if (len == 3 && e.keyCode > 53) {
            e.preventDefault();
          }


          if (len === 2) {
            elm.value += ':';
          }

        });
      }
    };


    hourInputMask(input);
  }

  public openChecklistDialog(checklist = {} as ChecklistDto) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    dialogConfig.data = {
      checklist: checklist,
      idAtividade: this.atividadeId
    };

    const dialogRef = this.dialog.open(ModalAdicionarChecklistComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      if (data != false) {
        this.ngOnInit();
        this.snackbarComponent.openSnackBar(`Subtarefa ${data} com sucesso !`, SnackBarTheme.success, 3000);
      } else {
        this.snackbarComponent.openSnackBar("Erro ao adicionar subtarefa !", SnackBarTheme.success, 3000);
      }

    });
  }

  public changeChecklistStatus(checkAtual: ChecklistDto) {

    checkAtual.checked = !checkAtual.checked;

    this.atividadeService.putAtividadeCheck(checkAtual).subscribe(
      (res) => { },
      (err) => { }
    );

  }

  public ExcluirChecklist(idCheck: string) {
    this.atividadeService.deleteAtividadeCheck(idCheck).subscribe(
      () => {
        this.ngOnInit();
        this.snackbarComponent.openSnackBar("Subtarefa excluída com sucesso !", SnackBarTheme.success, 3000);
      },
      () => { }
    )
  }

  public alterarEstadoHoras() {
    this.estadoHoras = !this.estadoHoras;
  }

  public adicionarHoras() {
    let horasPost = {} as HorasPostDto;

    if (this.checarSeFuncionarioEstaPresente()) {
      horasPost.minutos = this.calcularHorasPrevistas(this.f.minutos.value);
      horasPost.atividadeId = this.atividadeId;
      horasPost.funcionarioId = this.funcionarioAtual.id;
      console.log(horasPost);

      this.horasService.postHoras(horasPost).subscribe(
        () => {
          this.ngOnInit();
          this.snackbarComponent.openSnackBar("Horas adicionadas com sucesso !", SnackBarTheme.success, 3000);
        },
        () => { }
      )
    } else {
      this.snackbarComponent.openSnackBar("Você não faz parte dessa atividade !", SnackBarTheme.error, 3000);
    }


  }

  public pararPropagacao(event: any) {
    event.stopPropagation();
  }

  public editar() {
    this.router.navigate([`/atividades/editar-atividade/${this.atividadeId}`]);
  }

  public AdicionarFuncionario() {
    this.router.navigate([`/atividades/editar-atividade/${this.atividadeId}`], { queryParams: { adicionarFuncionario: true } });
  }

  public adicionarAtividadeFilho() {
    this.router.navigate([`/atividades/nova-atividade/${this.atividadeId}`]);
  }

  public irParaAtividadeFilha(id: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/atividades/atividade/${id}`]));
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

  public substituirImagem(evento: Event): void {
    const imagem = evento.target as HTMLImageElement;
    imagem.onerror = null;
    imagem.src = "../../../../../assets/images/default-image.png";
  }

  public checarSeFuncionarioEstaPresente(){
    return this.atividade.atividadeFuncionarios.find(funcionario => funcionario.funcionarioId === this.funcionarioAtual.id);
  }


}
