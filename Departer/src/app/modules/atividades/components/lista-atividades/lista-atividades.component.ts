import { AtividadeDto } from './../../models/atividadeDto';
import { AtividadeService } from './../../services/atividade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-atividades',
  templateUrl: './lista-atividades.component.html',
  styleUrls: ['./lista-atividades.component.scss']
})
export class ListaAtividadesComponent implements OnInit {

  atividades: AtividadeDto[] = [];

  constructor(private router: Router,private route: ActivatedRoute, private atividadeService: AtividadeService) { }

  ngOnInit(): void {
    this.getAtividades();
  }

  getAtividades(){
    this.atividadeService.getAtividades().subscribe(
      (res) =>{
        this.atividades = res.data;
      },
      () =>{}
    )
  }

  novaAtividade(){
    this.router.navigate(['/atividades/nova-atividade']);
  }

  irAtividade(){
    this.router.navigate(['/atividades/atividade']);
  }

}
