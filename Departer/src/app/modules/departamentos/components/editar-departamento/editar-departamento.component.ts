import { ModalAdicionarFuncionarioDepartamentoComponent } from './../../../shared/components/modal-adicionar-funcionario-departamento/modal-adicionar-funcionario-departamento.component';
import { ModoAdminService } from './../../../shared/services/modo-admin.service';
import { DepartamentoFuncionariosDto } from 'src/app/modules/shared/models/departamentoFuncionariosDto';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalAdicionarFuncionariosComponent } from 'src/app/modules/shared/components/modal-adicionar-funcionarios/modal-adicionar-funcionarios.component';
import { ModalInformacoesComponent } from 'src/app/modules/shared/components/modal-informacoes/modal-informacoes.component';
import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';
import { FuncionarioDto } from 'src/app/modules/shared/models/funcionarioDto';
import { SnackBarTheme } from 'src/app/modules/shared/models/snackbat.theme.enum';
import { DepartamentoDto } from '../../models/departamentoDto';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-editar-departamento',
  templateUrl: './editar-departamento.component.html',
  styleUrls: ['./editar-departamento.component.scss']
})
export class EditarDepartamentoComponent implements OnInit {

  idDepartamento: string = "";
  nomeDepartamento: string = "";
  funcionariosId: Array<string> = [];
  departamento?: DepartamentoDto;
  departamentoForm!: FormGroup;
  departamentoFuncionariosLista: DepartamentoFuncionariosDto[] = [];
  funcionariosLista: FuncionarioDto[] = [];

  public imagemPadrao = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';

  modoAdmin: boolean = false;


  get f(): any {
    return this.departamentoForm.controls;
  }

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog,
    private departamentoService: DepartamentoService, private readonly snackbarComponent: SnackbarComponent, private modoAdminService:ModoAdminService) { }

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      this.idDepartamento = x[`id`];
    });

    this.modoAdminService.modoAdmin$.subscribe(
      modoAdmin => {
        this.modoAdmin = modoAdmin;
        this.carregarDepartamento();
      }
    );

    this.formValidation();


    this.maskHour();
    this.maskHour2();
  }

  carregarDepartamento() {

    this.departamentoService.getDepartamentoById(this.idDepartamento, this.modoAdmin).subscribe({
      next: (response) => {
        console.log(response);

        this.departamentoFuncionariosLista = response.data.departamentoFuncionarios;

        this.departamentoFuncionariosLista.forEach(element => {
          this.funcionariosLista.push(element.funcionario);
        })


        let maximoHorasDiarias = this.transformarMinutosEmHoras(response.data.maximoHorasDiarias);
        let maximoHorasMensais = this.transformarMinutosEmHoras(response.data.maximoHorasMensais);

        this.nomeDepartamento = response.data.nome;

        let imagem;

        if(response.data.imageUrl == "https://cdn.shopify.com/s/files/1/0305/4075/9177/products/papel-de-parede-adesivo-degrade-roxo-e-azul-n05175-745864.jpg?v=1643338826"){
          imagem = "";
        }else{
          imagem = response.data.imageUrl;
        }

        this.departamentoForm.patchValue({
          id: this.idDepartamento, nome: this.nomeDepartamento, descricao: response.data.descricao,
          maximoHorasDiarias: maximoHorasDiarias, maximoHorasMensais: maximoHorasMensais, imageUrl: imagem
        });
      },
      error: (response) => {
      }
    })
  }

  public formValidation() {

    this.departamentoForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      imageUrl: new FormControl(''),
      maximoHorasDiarias: new FormControl('', [Validators.required]),
      maximoHorasMensais: new FormControl('', [Validators.required]),
    });
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

  public openFuncionarioDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    dialogConfig.data = this.funcionariosLista;

    const dialogRef = this.dialog.open(ModalAdicionarFuncionarioDepartamentoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      data.forEach((element: FuncionarioDto) => {
        this.funcionariosLista.push(element);
      });

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

  editarDepartamento() {

    if (this.departamentoForm.valid && this.funcionariosLista.length >= 1) {

      let departamentoPut: DepartamentoDto = { ...this.departamentoForm.value };


      departamentoPut.maximoHorasDiarias = this.calcularHorasPrevistas(this.f.maximoHorasDiarias.value);
      departamentoPut.maximoHorasMensais = this.calcularHorasPrevistas(this.f.maximoHorasMensais.value);

      if (departamentoPut.imageUrl == "") {
        departamentoPut.imageUrl = "https://cdn.shopify.com/s/files/1/0305/4075/9177/products/papel-de-parede-adesivo-degrade-roxo-e-azul-n05175-745864.jpg?v=1643338826";
      }

      let listaIdsAdicionar: string[] = [
      ]

      this.funcionariosLista.forEach(function (entry) {
        let singleObj: any = {};
        singleObj = entry.id;

        listaIdsAdicionar.push(singleObj);
      });



      departamentoPut.departamentoFuncionarios = [];
      departamentoPut.atividades = [];

      let listaIdsRetirar: string[] = [
      ]

      this.departamentoFuncionariosLista.forEach(function (entry) {
        let singleObj: any = {};
        singleObj = entry.funcionario.id;

        listaIdsRetirar.push(singleObj);
      });


      this.departamentoService.editarDepartamento(departamentoPut).subscribe({
        next: (response) => {
          this.snackbarComponent.openSnackBar("Departamento atualizado com sucesso!", SnackBarTheme.success, 3000);

          if (listaIdsRetirar.length > 0) {
            this.departamentoService.deleteDepartamentoFuncionario(this.idDepartamento, listaIdsRetirar).subscribe({
              next: (response) => {

                if (listaIdsAdicionar.length > 0) {
                  this.departamentoService.createDepartamentoFuncionario(this.idDepartamento, listaIdsAdicionar).subscribe({
                    next: (response) => {
                    },
                    error: (response) => {

                    }
                  })
                }

              },
              error: (response) => {

              }
            })
          }

          this.voltar();
        },
        error: (response) => {
          this.snackbarComponent.openSnackBar("Falha na Atualização, Verifique se todos os campos foram preenchidos corretamente!", SnackBarTheme.error, 3000);
        }
      })
    } else {
      this.snackbarComponent.openSnackBar("Verifique se todos os campos foram preenchidos corretamente!", SnackBarTheme.error, 3000);
    }

  }

  public substituirImagem(evento: Event): void {
    const imagem = evento.target as HTMLImageElement;
    imagem.onerror = null;
    imagem.src = this.imagemPadrao;
  }

  voltar() {
    this.router.navigate(['/departamentos/lista-departamentos']);
  }
}
