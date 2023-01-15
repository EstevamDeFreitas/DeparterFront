import { AtividadeDto } from './../../models/atividadeDto';
import { AtividadeService } from './../../services/atividade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {

  atividadeId: string = "";
  atividade = {} as AtividadeDto;

  constructor(private router: Router, private route: ActivatedRoute, private atividadeService: AtividadeService) { }

  ngOnInit(): void {
    this.getAtividade();
  }

  getAtividade(): void {
     this.atividadeId = this.route.snapshot.paramMap.get('id')!;

    if (this.atividadeId != null) {
      this.atividadeService.getAtividadeById(this.atividadeId).subscribe(
        (res) => {
          this.atividade = res.data;
        },
        () => { },
      )
    }
  }

  editar() {
    this.router.navigate([`/atividades/editar-atividade/${this.atividadeId}`]);
  }

}
