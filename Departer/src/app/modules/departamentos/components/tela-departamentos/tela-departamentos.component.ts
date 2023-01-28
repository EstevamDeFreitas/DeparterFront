import { DepartamentoService } from './../../services/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DepartamentoDto } from '../../models/departamentoDto';

@Component({
  selector: 'app-tela-departamentos',
  templateUrl: './tela-departamentos.component.html',
  styleUrls: ['./tela-departamentos.component.scss']
})
export class TelaDepartamentosComponent implements OnInit {

  idDepartamento: string = "";
  departamento?: DepartamentoDto;

  constructor(private router: Router,private route: ActivatedRoute,private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(x=>{
      this.idDepartamento = x[`id`];
    });

    this.carregarDepartamento();
    
  }

  carregarDepartamento(){

    this.departamentoService.getDepartamentoById(this.idDepartamento).subscribe({
      next: (response) => {
        console.log(response);
        this.departamento = response.data;
      },
      error: (response) => {
      }
    })
  }

  detalhesDepartamento(id: string){
    this.router.navigate([`/departamentos/detalhes-departamentos/${id}`]);
  }

}
