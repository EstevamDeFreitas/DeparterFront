import { HorasService } from './../../services/horas.service';
import { DepartamentoService } from './../../../departamentos/services/departamento.service';
import { DepartamentoDto } from './../../../departamentos/models/departamentoDto';
import { SnackBarTheme } from './../../../shared/models/snackbat.theme.enum';
import { SnackbarComponent } from './../../../shared/components/snackbar/snackbar.component';
import { AtividadeFuncionarios } from './../../models/atividadeFuncionarios';
import { AtividadeCategorias } from './../../models/atividadeCategorias';
import { DatePipe } from '@angular/common';
import { CategoriaService } from './../../../administracao/services/categoria.service';
import { FuncionarioService } from 'src/app/modules/configuracoes/services/funcionario.service';
import { AtividadeDto } from './../../models/atividadeDto';
import { AtividadeService } from './../../services/atividade.service';
import { ModalInformacoesComponent } from 'src/app/modules/shared/components/modal-informacoes/modal-informacoes.component';
import { ModalAdicionarFuncionariosComponent } from 'src/app/modules/shared/components/modal-adicionar-funcionarios/modal-adicionar-funcionarios.component';
import { ModalAdicionarCategoriaComponent } from 'src/app/modules/shared/components/modal-adicionar-categoria/modal-adicionar-categoria.component';
import { FuncionarioDto } from 'src/app/modules/shared/models/funcionarioDto';
import { CategoriaDto } from './../../../administracao/models/categoriaDto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalExcluirDesativarComponent } from './../../../shared/components/modal-excluir-desativar/modal-excluir-desativar.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-editar-atividade',
  templateUrl: './editar-atividade.component.html',
  styleUrls: ['./editar-atividade.component.scss']
})
export class EditarAtividadeComponent implements OnInit {

  dataAtual: Date = new Date();
  data: Date | null = null;

  atividadeId: string = "";

  categorias: CategoriaDto[] = [];
  funcionarios: FuncionarioDto[] = [];
  atividadesFilha: AtividadeDto[] = [];
  departamentoNome: string = "";

  funcionarioAtual = {} as FuncionarioDto;

  atividadeForm!: FormGroup;
  atividade = {} as AtividadeDto;

  hasError = false;
  errorMessage = "";

  get f(): any {
    return this.atividadeForm.controls;
  }

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private dateAdapter: DateAdapter<Date>, private atividadeService: AtividadeService, private funcionarioService: FuncionarioService, private categoriaService: CategoriaService, private readonly snackbarComponent: SnackbarComponent, private departamentoService: DepartamentoService, private horasService: HorasService) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    this.getAtividade();
    this.formValidation();

    this.maskDate();
    this.maskHour();
  }

  public getAtividade(): void {
    this.atividadeId = this.route.snapshot.paramMap.get('id')!;

    this.atividadeService.getAtividadeById(this.atividadeId).subscribe(
      (res) => {
        console.log(res.data)

        let dataEntrega = new Date(res.data.dataEntrega);
        let tempoPrevisto = this.transformarMinutosEmHoras(res.data.tempoPrevisto);

        this.atividadeForm.patchValue({ titulo: res.data.titulo, descricao: res.data.descricao, tempoPrevisto: tempoPrevisto, dataEntrega: dataEntrega, statusAtividade: res.data.statusAtividade });

        this.atividade = res.data;

        this.getFuncionarios(res.data.atividadeFuncionarios);
        this.getCategorias(res.data.atividadeCategorias);
        this.getDepartamentoNome();

        if (this.route.snapshot.queryParamMap.get('adicionarFuncionario') === 'true') {
          this.openFuncionarioDialog();
        }
      },
      () => { }
    )
  }

  public getFuncionarios(funcionariosList: AtividadeFuncionarios[]): void {
    funcionariosList.forEach((funcionario) => {
      this.funcionarioService.getFuncionarioById(funcionario.funcionarioId).subscribe(
        (res) => {
          res.data.nivelAcesso = funcionario.nivelAcesso;
          this.funcionarios.push(res.data);
        },
        () => { },
        () => {
          this.funcionarios.sort((a, b) => b.nivelAcesso! - a.nivelAcesso!);
          this.getFuncionarioAtual();
        }
      )
    });



  }

  public getFuncionarioAtual(): void {
    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) => {
        this.funcionarioAtual = res.data;

        const funcionarioEncontrado = this.funcionarios.find((funcionario) => funcionario.id === this.funcionarioAtual.id);
        this.funcionarioAtual.nivelAcesso = funcionarioEncontrado?.nivelAcesso;

      },
      () => { }
    )
  }

  public getCategorias(categoriasList: AtividadeCategorias[]): void {
    categoriasList.forEach((categoria) => {
      this.categoriaService.getCategoriaById(categoria.categoriaId).subscribe(
        (res) => {
          this.categorias.push(res.data);
        },
        () => { }
      )
    });

  }

  getDepartamentoNome(): void {
    this.departamentoService.getDepartamentoById(this.atividade.departamentoId).subscribe(
      (res) => {
        this.departamentoNome = res.data.nome;
      },
      () => { }
    )
  }


  public formValidation() {
    this.atividadeForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      dataEntrega: new FormControl('', [Validators.required]),
      tempoPrevisto: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      statusAtividade: new FormControl('', [Validators.required])
    });
  }

  maskDate() {
    var input = document.querySelectorAll('.mask-date')[0];
    var dateInputMask = function dateInputMask(elm: any) {
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
          if (len === 2) {
            elm.value += '/';
          }
          if (len === 5) {
            elm.value += '/';
          }
        });
      }
    };
    dateInputMask(input);
  }

  maskHour() {
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

  public openCategoriasDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    dialogConfig.data = this.categorias;

    const dialogRef = this.dialog.open(ModalAdicionarCategoriaComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      data.forEach((element: CategoriaDto) => {
        this.categorias.push(element);
      });

    });
  }

  public openFuncionarioDialog() {

    if (this.funcionarioAtual.nivelAcesso! >= 3) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = false;

      dialogConfig.data = {
        funcionariosLista: this.funcionarios,
        departamentoId: this.atividade.departamentoId,
        tipoAdicionar: 1
      };

      const dialogRef = this.dialog.open(ModalAdicionarFuncionariosComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {

        data.forEach((element: FuncionarioDto) => {
          element.nivelAcesso = 0;
          this.funcionarios.push(element);
        });

      });
    } else {
      this.snackbarComponent.openSnackBar("Você não tem acesso para adicionar funcionarios !", SnackBarTheme.error, 3000);
    }

  }

  public openInfoDialog() {

    const dialogConfig = new MatDialogConfig();

    this.dialog.open(ModalInformacoesComponent, dialogConfig);
  }

  public hoverNaCategoria(i: number, flag: number) {
    let categoriaSelecionadaAtual = document.getElementById(`icon${i}`) as HTMLElement;

    if (flag == 1)
      categoriaSelecionadaAtual.style.display = "inline"
    else {
      categoriaSelecionadaAtual.style.display = "none"
    }

  }

  public excluirCategoria(categoriaId: string) {
    let index = this.categorias.map(e => e.id).indexOf(categoriaId);
    this.categorias.splice(index, 1);
  }

  public excluirFuncionario(funcionarioId: string): void {
    let index = this.funcionarios.map(e => e.id).indexOf(funcionarioId);

    this.horasService.getHorasByAtividadeId(this.atividade.id).subscribe(
      (res) => {
        let horasFuncionario = res.data.filter(horas => horas.funcionarioId === funcionarioId);
        if (horasFuncionario.length > 0) {
          this.snackbarComponent.openSnackBar(`Não é possível excluir o funcionário ${horasFuncionario[0].funcionario.nome} porque ele já adicionou horas à atividade.`, SnackBarTheme.error, 3000);
          return;
        }

        this.funcionarios.splice(index, 1);
      },
      () => { },
      () => { }
    );
  }

  public alterarPermissaoFuncionario(funcionarioId: string, event: any) {
    let index = this.funcionarios.map(e => e.id).indexOf(funcionarioId);
    this.funcionarios[index].nivelAcesso = event.target.value - 1;
  }

  public desativarAtividade() {
    let atividadeTemHoras: boolean = false;

    this.horasService.getHorasByAtividadeId(this.atividade.id).subscribe(
      (res) => {
        if (res.data.length > 0) {
          atividadeTemHoras = true;
        }
      },
      () => { },
      () => {
        if (!atividadeTemHoras) {
          if (this.funcionarioAtual.nivelAcesso! >= 2) {

            let dataDialog = {
              title: "Você realmente deseja desativar?",
              message: "Você pode ativar novamente caso queira ou seja necessário.",
              cancel: "Não, gostaria de voltar",
              confirm: "Sim, desejo desativar"
            }

            const dialogRef = this.dialog.open(ModalExcluirDesativarComponent, {
              panelClass: 'custom-modal',
              backdropClass: 'backdrop-blur',
              width: '600px',
              height: 'auto',
              data: dataDialog,
            }).afterClosed().subscribe(result => {

              if (result == true) {
                this.atividadeService.deleteAtividade(this.atividade.id).subscribe(
                  () => {
                    this.snackbarComponent.openSnackBar("Atividade desativada com sucesso !", SnackBarTheme.error, 3000);
                    this.router.navigate(['atividades/lista-atividades'])
                  }
                )
              }

            });
          } else {
            this.snackbarComponent.openSnackBar("Você não tem acesso para desativar a atividade !", SnackBarTheme.error, 3000);
          }
        } else {
          this.snackbarComponent.openSnackBar("Não é possivel desativar a atividade, porque ela possui horas trabalhadas !", SnackBarTheme.error, 3000);
        }
      }
    );

  }

  public atividadeCriada(): void {

    if (this.atividadeForm.valid && this.categorias.length >= 1 && this.funcionarios.length >= 1) {

      let atividadePut: AtividadeDto = { ...this.atividadeForm.value };

      let data = new DatePipe('en').transform(this.f.dataEntrega.value, 'yyyy-MM-dd');
      atividadePut.dataEntrega = data!;

      atividadePut.tempoPrevisto = this.calcularHorasPrevistas(this.f.tempoPrevisto.value);

      atividadePut.statusAtividade = +this.f.statusAtividade.value;
      console.log(atividadePut);

      atividadePut.atividadeCategorias = [];
      this.categorias.forEach((element) => {
        atividadePut.atividadeCategorias.push({ categoriaId: element.id, atividadeId: this.atividadeId })
      });

      atividadePut.atividadeFuncionarios = [];
      this.funcionarios.forEach(element => {

        let funcionarioToAtivFuncionarios;

        if (element.nivelAcesso != undefined) {
          funcionarioToAtivFuncionarios = { funcionarioEmail: element.email, nivelAcesso: element.nivelAcesso, atividadeId: this.atividadeId, funcionarioId: element.id };
        } else {
          funcionarioToAtivFuncionarios = { funcionarioEmail: element.email, nivelAcesso: 0, atividadeId: this.atividadeId, funcionarioId: element.id };
        }

        atividadePut.atividadeFuncionarios.push(funcionarioToAtivFuncionarios);

      });

      atividadePut.id = this.atividadeId;
      atividadePut.departamentoId = this.atividade.departamentoId;


      this.atividadeService.updateAtividade(atividadePut).subscribe(
        (res) => {
          this.router.navigate(['/atividades/lista-atividades']);
          this.snackbarComponent.openSnackBar("Atividade alterada com sucesso !", SnackBarTheme.success, 3000);
        },
        () => { }
      )

    } else {
      this.snackbarComponent.openSnackBar("Preencha todo o formulario !", SnackBarTheme.error, 3000);
    }

  }

  public calcularHorasPrevistas(horas: string): number {
    let arrayHoras = horas.split('');

    let resultadoFinal = (+(arrayHoras[0] + arrayHoras[1]) * 60) + +(arrayHoras[3] + arrayHoras[4]);

    return resultadoFinal;
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

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

  cancelar() {
    this.router.navigate([`/atividades/atividade/${this.atividadeId}`]);
  }

  public substituirImagem(evento: Event): void {
    const imagem = evento.target as HTMLImageElement;
    imagem.onerror = null;
    imagem.src = "../../../../../assets/images/default-image.png";
  }

}
