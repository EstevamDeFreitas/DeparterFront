import { Router } from '@angular/router';
import { AtividadeListDto } from './../../../atividades/models/atividadeDto';
import { AtividadeService } from './../../../atividades/services/atividade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumo-atividades',
  templateUrl: './resumo-atividades.component.html',
  styleUrls: ['./resumo-atividades.component.scss']
})
export class ResumoAtividadesComponent implements OnInit {

  public atividades: AtividadeListDto[] = [];

  constructor(private atividadeService: AtividadeService, private router: Router) { }

  ngOnInit(): void {
  }

  public getAtividade(){
    this.atividadeService.getAtividades().subscribe(
      (res) => {
        console.log(res.data);
        this.atividades = res.data
      },
      () => {}
    )
  }

  irAtividade(id: string) {
    this.router.navigate([`/atividades/atividade/${id}`]);
  }

}
