import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { GraficosService } from '../../services/graficos.service';
import { GraficoAtividadesConcluidasDto } from '../../models/graficosDto';


@Component({
  selector: 'app-grafico-atividades-concluidas',
  templateUrl: './grafico-atividades-concluidas.component.html',
  styleUrls: ['./grafico-atividades-concluidas.component.scss']
})
export class GraficoAtividadesConcluidasComponent implements OnInit {

  @Input() funcionarioId: string = "";
  @Input() departamentoId?: string = "";

  atividadesConcluidas!: GraficoAtividadesConcluidasDto;

  chartSeries: ApexNonAxisChartSeries = [];

  chartDetails: ApexChart = {
    type: 'donut',
    toolbar: {
      show: false
    }
  };

  chartLabels = ["Finalizadas", "Atrasadas", "Pendente"];

  /*
  chartTitle: ApexTitleSubtitle = {
    text: 'Leading Companies',
    align: 'center'
  };
  */

  chartDataLabels: ApexDataLabels = {
    enabled: true
  };

  constructor(private graficoService: GraficosService) { }

  ngOnInit(): void {
    this.getAtividadesConcluidas();

  }

  getAtividadesConcluidas(){

    this.graficoService.getAtividadeResumo(0,this.funcionarioId,this.departamentoId).subscribe({
      next: (response) => {
        this.atividadesConcluidas = response.data;
        console.log(this.atividadesConcluidas);
        this.getGraficoMontado();
      },
      error: (response) => {
        
      }
    });


  }

  getGraficoMontado(){

    this.chartSeries = [this.atividadesConcluidas.finalizadas,this.atividadesConcluidas.atrasadas,this.atividadesConcluidas.pendente]

  }



}
