import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-departamentos',
  templateUrl: './tela-departamentos.component.html',
  styleUrls: ['./tela-departamentos.component.scss']
})
export class TelaDepartamentosComponent implements OnInit {

  idDepartamento: string = "";

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(x=>{
      this.idDepartamento = x[`id`];
    });
  }

  detalhesDepartamento(id: string){
    this.router.navigate([`/departamentos/detalhes-departamentos/${id}`]);
  }

}
