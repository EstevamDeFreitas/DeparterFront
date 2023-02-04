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


  get f(): any {
    return this.departamentoForm.controls;
  }

  constructor(private router: Router,private route: ActivatedRoute,public dialog: MatDialog,
    private departamentoService: DepartamentoService,private readonly snackbarComponent: SnackbarComponent) { }

  ngOnInit(): void {
    this.route.params.subscribe(x=>{
      this.idDepartamento = x[`id`];
    });

    this.formValidation();
    this.carregarDepartamento();
    
    this.maskHour();
    this.maskHour2();
  }

  carregarDepartamento(){

    this.departamentoService.getDepartamentoById(this.idDepartamento).subscribe({
      next: (response) => {
        console.log(response);

        this.departamentoFuncionariosLista = response.data.departamentoFuncionarios;

        this.departamentoFuncionariosLista.forEach(element => {
          this.funcionariosLista.push(element.funcionario);
        })


        let maximoHorasDiarias = this.transformarMinutosEmHoras(response.data.maximoHorasDiarias);
        let maximoHorasMensais = this.transformarMinutosEmHoras(response.data.maximoHorasMensais);

        this.nomeDepartamento = response.data.nome;
        
        this.departamentoForm.patchValue({id: this.idDepartamento, nome: this.nomeDepartamento, descricao: response.data.descricao, 
          maximoHorasDiarias: maximoHorasDiarias, maximoHorasMensais: maximoHorasMensais });
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

  public openFuncionarioDialog() {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    dialogConfig.data = this.funcionariosLista;

    const dialogRef = this.dialog.open(ModalAdicionarFuncionariosComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      data.forEach((element: FuncionarioDto) => {
        this.funcionariosLista.push(element);
        this.funcionariosId.push(element.id);
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

  editarDepartamento(){

    if (this.departamentoForm.valid && this.funcionariosLista.length >= 1) {

      let departamentoPut: DepartamentoDto = { ...this.departamentoForm.value };


      departamentoPut.maximoHorasDiarias = this.calcularHorasPrevistas(this.f.maximoHorasDiarias.value);
      departamentoPut.maximoHorasMensais = this.calcularHorasPrevistas(this.f.maximoHorasMensais.value);

      let listaIds : { funcionarioId: string }[] = [
      ]
  
      this.funcionariosId.forEach(function(entry) {
          let singleObj: any = {};
          singleObj['funcionarioId'] = entry;
  
          listaIds.push(singleObj);
      });

      departamentoPut.departamentoFuncionarios = listaIds;

      console.log(departamentoPut);

      this.departamentoService.editarDepartamento(departamentoPut).subscribe({
        next: (response) => {
          this.snackbarComponent.openSnackBar("Departamento atualizado com sucesso!",SnackBarTheme.success,3000);
          this.voltar();
        },
        error: (response) => {
          this.snackbarComponent.openSnackBar("Falha na Atualização, Verifique se todos os campos foram preenchidos corretamente!", SnackBarTheme.error, 3000);
        }
      })
    }else{
      this.snackbarComponent.openSnackBar("Verifique se todos os campos foram preenchidos corretamente!", SnackBarTheme.error, 3000);
    }
   
  }

  voltar(){
    this.router.navigate(['/departamentos/lista-departamentos']);
  }
}
