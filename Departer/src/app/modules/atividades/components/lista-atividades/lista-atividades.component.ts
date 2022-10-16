import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-atividades',
  templateUrl: './lista-atividades.component.html',
  styleUrls: ['./lista-atividades.component.scss']
})
export class ListaAtividadesComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  novaAtividade(){
    this.router.navigate(['/atividades/nova-atividade']);
  }

  irAtividade(){
    this.router.navigate(['/atividades/atividade']);
  }

}
