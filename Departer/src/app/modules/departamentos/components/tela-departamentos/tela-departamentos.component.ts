import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-departamentos',
  templateUrl: './tela-departamentos.component.html',
  styleUrls: ['./tela-departamentos.component.scss']
})
export class TelaDepartamentosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  detalhesDepartamento(){
    this.router.navigate(['/departamentos/detalhes-departamentos']);
  }

}
