import { AtividadeGetFuncionarios } from './../../models/atividadeFuncionarios';
import { AtividadeDto, AtividadeGetDto } from './../../models/atividadeDto';
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
  funcionariosLista: FuncionarioDto[] = [];

  atividadeForm!: FormGroup;
  atividade = {} as AtividadeGetDto;

  hasError = false;
  errorMessage = "";

  get f(): any {
    return this.atividadeForm.controls;
  }

  constructor(private router: Router,private route: ActivatedRoute,public dialog: MatDialog,private dateAdapter: DateAdapter<Date>, private atividadeService: AtividadeService) {
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

        this.atividadeForm.patchValue({titulo: res.data.titulo, descricao: res.data.descricao, tempoPrevisto: tempoPrevisto, dataEntrega: dataEntrega});

        this.getFuncionarios(res.data.atividadeFuncionarios);
        this.getCategorias(res.data.atividadeCategorias);
      },
      (err) => {
        this.hasError = true;
        this.errorMessage = err.error.message;
      }
    )
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
    var input = document.querySelectorAll('.mask-date')[0];
    var dateInputMask = function dateInputMask(elm: any ) {
      if(elm !== undefined){
      elm.addEventListener('keypress', function(e: any) {
        if(e.keyCode < 47 || e.keyCode > 57) {
          e.preventDefault();
        }

        var len = elm.value.length;
        if(len !== 1 || len !== 3) {
          if(e.keyCode == 47) {
            e.preventDefault();
          }
        }
        if(len === 2) {
          elm.value += '/';
        }
        if(len === 5) {
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
    console.log(this.funcionariosLista);
  }

  desativarAtividade(){

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
      data:dataDialog,
    }).afterClosed().subscribe(result => {

      if(result==true){

        }


    });
  }

  editarAtividade(){

  }

  transformarMinutosEmHoras(minutosPrevistos: number): string {

    let horas: number | string = Math.floor(minutosPrevistos / 60);
    let minutos: number | string = minutosPrevistos % 60;

    if(horas <= 9){
      horas = "" + 0 + horas;
    }

    if(minutos <= 9){
      minutos = "" + 0 + minutos;
    }

    return '' + horas + ':' + minutos;

  }

  getFuncionarios(funcionariosList: AtividadeGetFuncionarios[]): void {
    console.log(funcionariosList);
  }

  getCategorias(categoriasList: {atividadeId: "", categoriaId: ""}[]): void {
    console.log(categoriasList);

  }


  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

  cancelar(){
    this.router.navigate(['/atividades/lista-atividades']);
  }

}
