import { ModoAdminService } from './../../../shared/services/modo-admin.service';
import { DepartamentoFuncionariosDto } from 'src/app/modules/shared/models/departamentoFuncionariosDto';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';
import { FuncionarioDto } from 'src/app/modules/shared/models/funcionarioDto';
import { SnackBarTheme } from 'src/app/modules/shared/models/snackbat.theme.enum';
import { DepartamentoDto } from '../../models/departamentoDto';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-detalhes-departamentos',
  templateUrl: './detalhes-departamentos.component.html',
  styleUrls: ['./detalhes-departamentos.component.scss']
})
export class DetalhesDepartamentosComponent implements OnInit {

  idDepartamento: string = "";
  maximoHorasDiarias: string = "";
  maximoHorasMensais: string = "";
  departamento?: DepartamentoDto;
  funcionariosLista: DepartamentoFuncionariosDto[] = [];

  modoAdmin: boolean = false;



  constructor(private router: Router, private readonly snackbarComponent: SnackbarComponent,private route: ActivatedRoute,
    private departamentoService: DepartamentoService, private modoAdminService: ModoAdminService) { }

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

    this.maskHour();
    this.maskHour2();
  }

  carregarDepartamento(){
    console.log(this.idDepartamento);

    this.departamentoService.getDepartamentoById(this.idDepartamento, this.modoAdmin).subscribe({
      next: (response) => {

        this.departamento = response.data;
        this.funcionariosLista = this.departamento.departamentoFuncionarios;

        this.maximoHorasDiarias = this.transformarMinutosEmHoras(response.data.maximoHorasDiarias);
        this.maximoHorasMensais = this.transformarMinutosEmHoras(response.data.maximoHorasMensais);

      },
      error: (response) => {
      }
    })
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

  excluirDepartamento(){
    this.departamentoService.deleteDepartamentoById(this.idDepartamento).subscribe({
      next: (response) => {
        this.snackbarComponent.openSnackBar("Departamento desativado com sucesso!",SnackBarTheme.success,3000);
        this.voltar();
      },
      error: (response) => {
        this.snackbarComponent.openSnackBar("Falha ao Desativar!", SnackBarTheme.error, 3000);
      }
    })
  }

  public irParaEditarDepartamento(id: string){
    this.router.navigate([`/departamentos/editar-departamento/${id}`]);
  }

  voltar(){
    this.router.navigate(['/departamentos/lista-departamentos']);
  }

}
