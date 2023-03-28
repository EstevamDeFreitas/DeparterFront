import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public irParaAtividades(): void {
    this.router.navigate(["/atividades/lista-atividades"]);
  }

  public irParaHoras(): void {
    this.router.navigate(["/horas"]);
  }

}
