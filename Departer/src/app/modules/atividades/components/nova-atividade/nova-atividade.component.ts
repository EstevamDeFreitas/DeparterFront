import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nova-atividade',
  templateUrl: './nova-atividade.component.html',
  styleUrls: ['./nova-atividade.component.scss']
})
export class NovaAtividadeComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute,private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
  }

  cancelar(){
    this.router.navigate(['/atividades/lista-atividades']);
  }

  public atividadeCriada(): void {
    this.router.navigate(['/atividades/atividade'])
  }

}
