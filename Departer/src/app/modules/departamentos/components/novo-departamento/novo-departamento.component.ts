import { ModalAdicionarFuncionarioDepartamentoComponent } from './../../../shared/components/modal-adicionar-funcionario-departamento/modal-adicionar-funcionario-departamento.component';
import { SnackbarComponent } from './../../../shared/components/snackbar/snackbar.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from './../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioDto } from 'src/app/modules/shared/models/funcionarioDto';
import { ModalAdicionarFuncionariosComponent } from 'src/app/modules/shared/components/modal-adicionar-funcionarios/modal-adicionar-funcionarios.component';
import { ModalInformacoesComponent } from 'src/app/modules/shared/components/modal-informacoes/modal-informacoes.component';
import { DepartamentoDto } from '../../models/departamentoDto';
import { SnackBarTheme } from 'src/app/modules/shared/models/snackbat.theme.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-novo-departamento',
  templateUrl: './novo-departamento.component.html',
  styleUrls: ['./novo-departamento.component.scss']
})
export class NovoDepartamentoComponent implements OnInit {

  departamentoForm!: FormGroup;
  funcionariosId: Array<string> = [];
  funcionariosLista: FuncionarioDto[] = [];

  public environment = environment;


  get f(): any {
    return this.departamentoForm.controls;
  }

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,
    private departamentoService: DepartamentoService, private readonly snackbarComponent: SnackbarComponent) { }

  ngOnInit(): void {
    this.formValidation();
    this.maskHour();
    this.maskHour2();
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
  maskHour2() {
    // Mask Hour Input
    var input = document.querySelectorAll('#horas2')[0];
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

  public formValidation() {

    this.departamentoForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      imageUrl: new FormControl(''),
      maximoHorasDiarias: new FormControl('', [Validators.required]),
      maximoHorasMensais: new FormControl('', [Validators.required]),
    });
  }

  public openFuncionarioDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    console.log(this.funcionariosLista)

    dialogConfig.data = this.funcionariosLista;

    const dialogRef = this.dialog.open(ModalAdicionarFuncionarioDepartamentoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      data.forEach((element: FuncionarioDto) => {

        this.funcionariosLista.push(element);
        this.funcionariosId.push(element.id);
      });


    });
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
  public openInfoDialog() {

    const dialogConfig = new MatDialogConfig();

    this.dialog.open(ModalInformacoesComponent, dialogConfig);
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

  public calcularHorasPrevistas(horas: string): number {
    let arrayHoras = horas.split('');

    let resultadoFinal = (+(arrayHoras[0] + arrayHoras[1]) * 60) + +(arrayHoras[3] + arrayHoras[4]);

    return resultadoFinal;
  }

  criarDepartamento() {

    if (this.departamentoForm.valid && this.funcionariosLista.length >= 1) {

      let departamentoPost: DepartamentoDto = { ...this.departamentoForm.value };


      departamentoPost.maximoHorasDiarias = this.calcularHorasPrevistas(this.f.maximoHorasDiarias.value);
      departamentoPost.maximoHorasMensais = this.calcularHorasPrevistas(this.f.maximoHorasMensais.value);

      if (departamentoPost.imageUrl == "") {
        departamentoPost.imageUrl = "https://cdn.shopify.com/s/files/1/0305/4075/9177/products/papel-de-parede-adesivo-degrade-roxo-e-azul-n05175-745864.jpg?v=1643338826";
      }

      let listaIds: { funcionarioId: string }[] = [
      ]

      this.funcionariosId.forEach(function (entry) {
        let singleObj: any = {};
        singleObj['funcionarioId'] = entry;

        listaIds.push(singleObj);
      });

      departamentoPost.departamentoFuncionarios = listaIds;


      console.log(departamentoPost)


      this.departamentoService.createDepartamento(departamentoPost).subscribe({
        next: (response) => {
          this.snackbarComponent.openSnackBar("Cadastro realizado com sucesso!", SnackBarTheme.success, 3000);
          this.voltar();
        },
        error: (response) => {
          this.snackbarComponent.openSnackBar("Falha no Cadastro, Verifique se todos os campos foram preenchidos corretamente!", SnackBarTheme.error, 3000);
        }
      })

    } else {
      this.snackbarComponent.openSnackBar("Verifique se todos os campos foram preenchidos corretamente!", SnackBarTheme.error, 3000);
    }

  }

  voltar() {
    this.router.navigate(['/departamentos/lista-departamentos']);
  }

  public substituirImagem(evento: Event): void {
    const imagem = evento.target as HTMLImageElement;
    imagem.onerror = null;
    imagem.src = "../../../../../assets/images/default-image.png";
  }


}
