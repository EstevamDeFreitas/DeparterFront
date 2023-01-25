import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-detalhes-departamentos',
  templateUrl: './detalhes-departamentos.component.html',
  styleUrls: ['./detalhes-departamentos.component.scss']
})
export class DetalhesDepartamentosComponent implements OnInit {

  idDepartamento: string = "";

  constructor(private router: Router, private readonly snackbarComponent: SnackbarComponent,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(x=>{
      this.idDepartamento = x[`id`];
    });
  }

  public editarDepartamento(id: string){
    this.router.navigate([`/departamentos/editar-departamento/${id}`]);
  }

}
