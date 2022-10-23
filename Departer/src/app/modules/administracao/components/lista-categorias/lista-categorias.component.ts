import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.scss']
})
export class ListaCategoriasComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  cadastrarCategoria(){
    this.router.navigate(['/administracao/categorias/nova-categoria']);
  }

}
