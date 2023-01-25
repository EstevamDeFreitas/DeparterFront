import { DepartamentoService } from './../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';
import { DepartamentoDto } from '../../models/departamentoDto';
import { SnackBarTheme } from 'src/app/modules/shared/models/snackbat.theme.enum';

@Component({
  selector: 'app-lista-departamentos',
  templateUrl: './lista-departamentos.component.html',
  styleUrls: ['./lista-departamentos.component.scss']
})
export class ListaDepartamentosComponent implements OnInit {

  departamentos: any;

  constructor(private router: Router,private route: ActivatedRoute,private departamentoService: DepartamentoService,private readonly snackbarComponent: SnackbarComponent) { }

  ngOnInit(): void {
    this.getDepartamentos();
  }

  getDepartamentos(){
    this.departamentoService.getDepartamentos().subscribe({
      next: (response) => {
        console.log(response);
        this.departamentos = response.data;
        this.snackbarComponent.openSnackBar("Cadastro realizado com suceso!",SnackBarTheme.success,3000);
      },
      error: (response) => {
        this.snackbarComponent.openSnackBar("Não foi encontrado nenhum Departamento cadastrado!", SnackBarTheme.error, 3000);
      }
    })
  }

  novoDepartamento(){
    this.router.navigate(['/departamentos/novo-departamento']);
  }

  detalhesDepartamento(id: string){
    this.router.navigate([`/departamentos/geral-departamentos/${id}`]);
  }

}
