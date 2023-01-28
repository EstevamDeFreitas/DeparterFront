import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';
import { DepartamentoDto } from '../../models/departamentoDto';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-detalhes-departamentos',
  templateUrl: './detalhes-departamentos.component.html',
  styleUrls: ['./detalhes-departamentos.component.scss']
})
export class DetalhesDepartamentosComponent implements OnInit {

  idDepartamento: string = "";
  departamento?: DepartamentoDto;

  constructor(private router: Router, private readonly snackbarComponent: SnackbarComponent,private route: ActivatedRoute,
    private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(x=>{
      this.idDepartamento = x[`id`];
    });

    this.carregarDepartamento();
  }

  carregarDepartamento(){
    console.log(this.idDepartamento);

    this.departamentoService.getDepartamentoById(this.idDepartamento).subscribe({
      next: (response) => {
        console.log(response);
        this.departamento = response.data;
      },
      error: (response) => {
      }
    })
  }

  public editarDepartamento(id: string){
    this.router.navigate([`/departamentos/editar-departamento/${id}`]);
  }

}
