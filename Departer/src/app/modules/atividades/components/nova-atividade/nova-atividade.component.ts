import { DepartamentoDto } from './../../../departamentos/models/departamentoDto';
import { DepartamentoService } from './../../../departamentos/services/departamento.service';
import { FuncionarioService } from './../../../configuracoes/services/funcionario.service';
import { AtividadeService } from './../../services/atividade.service';
import { DatePipe } from '@angular/common';
import { AtividadePostDto } from './../../models/atividadeDto';
import { FuncionarioDto } from './../../../shared/models/funcionarioDto';
import { CategoriaDto } from './../../../administracao/models/categoriaDto';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalAdicionarFuncionariosComponent } from 'src/app/modules/shared/components/modal-adicionar-funcionarios/modal-adicionar-funcionarios.component';
import { ModalInformacoesComponent } from 'src/app/modules/shared/components/modal-informacoes/modal-informacoes.component';
import { ModalAdicionarCategoriaComponent } from 'src/app/modules/shared/components/modal-adicionar-categoria/modal-adicionar-categoria.component';

@Component({
  selector: 'app-nova-atividade',
  templateUrl: './nova-atividade.component.html',
  styleUrls: ['./nova-atividade.component.scss']
})
export class NovaAtividadeComponent implements OnInit {

  dataAtual: Date = new Date();
  data: Date | null = null;

  categorias: CategoriaDto[] = [];
  funcionariosLista: FuncionarioDto[] = [];

  departamentos: DepartamentoDto[] = [];
  departamentoId: string = "";

  atividadePaiId: string = "";
  estadoSalvar: string = "semPai";



  atividadeForm!: FormGroup;

  hasError = false;
  errorMessage = "";

  get f(): any {
    return this.atividadeForm.controls;
  }

  constructor(private router: Router, private route: ActivatedRoute, private dateAdapter: DateAdapter<Date>, public dialog: MatDialog, private atividadeService: AtividadeService, private funcionarioService: FuncionarioService, private departamentoService: DepartamentoService) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    this.formValidation();
    this.identificarModoPost();
    this.getFuncionarioLogado();



    this.maskDate();
    this.maskHour()
  }

  public getFuncionarioLogado(): void {
    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) =>{
        res.data.nivelAcesso = 4;
        this.funcionariosLista.push(res.data)

        this.getAllDepartamentos();
      },
      (err) => {
        this.hasError = true;
        this.errorMessage = err.error.message;
      }
    )
  }

  public getAllDepartamentos(){
    this.departamentoService.getDepartamentos().subscribe(
      (res)=>{
        this.departamentos = res.data;
        console.log(this.departamentos);
      },
      ()=>{}
    )
  }

  public identificarModoPost(){
    this.atividadePaiId = this.route.snapshot.paramMap.get('idAtividadePai')!;

    if (this.atividadePaiId !== null && this.atividadePaiId !== "") {
      this.estadoSalvar = 'comPai';
    }

  }

  public formValidation() {
    this.atividadeForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      dataEntrega: new FormControl('', [Validators.required]),
      tempoPrevisto: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    });
  }

  maskDate() {
    // Mask Date Input
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
    // Mask Hour Input
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

          if(len == 3 && e.keyCode > 53){
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

  changeDepartamento(event: any){
    let id = event.target.value;
    this.departamentoId = id;
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    dialogConfig.data = this.funcionariosLista;

    const dialogRef = this.dialog.open(ModalAdicionarFuncionariosComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      data.forEach((element: FuncionarioDto) => {
        element.nivelAcesso = 0;
        this.funcionariosLista.push(element);
      });

    });
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
    let index = this.funcionariosLista.map(e => e.id).indexOf(funcionarioId);
    this.funcionariosLista.splice(index, 1);
  }

  public alterarPermissaoFuncionario(funcionarioId: string, event: any) {
    let index = this.funcionariosLista.map(e => e.id).indexOf(funcionarioId);
    this.funcionariosLista[index].nivelAcesso = event.target.value - 1;
  }

  public atividadeCriada(): void {

    if (this.atividadeForm.valid && this.categorias.length >= 1 && this.funcionariosLista.length >= 1 && this.departamentoId != "") {

      let atividadePost: AtividadePostDto = { ...this.atividadeForm.value };

      let data = new DatePipe('en').transform(this.f.dataEntrega.value, 'yyyy-MM-dd');
      atividadePost.dataEntrega = data!;

      atividadePost.tempoPrevisto = this.calcularHorasPrevistas(this.f.tempoPrevisto.value);

      atividadePost.categorias = this.categorias.map(e => e.id);

      atividadePost.atividadeFuncionarios = [];
      this.funcionariosLista.forEach(element => {
        let funcionarioToAtivFuncionarios;

        if (element.nivelAcesso != undefined) {
          funcionarioToAtivFuncionarios = { funcionarioEmail: element.email, nivelAcesso: element.nivelAcesso };
        } else {
          funcionarioToAtivFuncionarios = { funcionarioEmail: element.email, nivelAcesso: 0 };
        }

        atividadePost.atividadeFuncionarios.push(funcionarioToAtivFuncionarios);
      })

      if(this.estadoSalvar == "comPai"){
        atividadePost.atividadePaiId = this.atividadePaiId
      }

      atividadePost.departamentoId = this.departamentoId;

      this.atividadeService.postAtividade(atividadePost).subscribe(
        (res) => {
          console.log(res)
          this.router.navigate(['/atividades/lista-atividades']);
        },
        (error) => {
          this.hasError = true;
          this.errorMessage = error.error.message;
        }
      )

    } else {
      //snackbar de mensagem de erro.
    }

  }

  public calcularHorasPrevistas(horas: string): number {
    let arrayHoras = horas.split('');

    let resultadoFinal = (+(arrayHoras[0] + arrayHoras[1]) * 60) + +(arrayHoras[3] + arrayHoras[4]);

    return resultadoFinal;
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

  public cancelar() {
    if(this.estadoSalvar == "semPai")
      this.router.navigate(['/atividades/lista-atividades']);
    else
      this.router.navigate([`/atividades/atividade/${this.atividadePaiId}`]);
  }

}
