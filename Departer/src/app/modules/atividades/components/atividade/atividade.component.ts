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

  atividade = {} as AtividadeDto;

  constructor(private router: Router,private route: ActivatedRoute, private atividadeService: AtividadeService) { }

  ngOnInit(): void {
    this.getAtividade();
  }

  getAtividade(): void {
    this.atividadeService.getAtividadeById('e15211f7-c1be-455d-ba68-2bb26f63fe2d').subscribe(
      (res)=>{
        this.atividade = res.data;
      },
      ()=>{},
    )
  }

  editar(){
    this.router.navigate(['/atividades/editar-atividade']);
  }

}
