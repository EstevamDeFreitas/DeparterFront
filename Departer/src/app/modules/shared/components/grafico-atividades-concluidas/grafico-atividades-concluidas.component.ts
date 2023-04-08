import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';


@Component({
  selector: 'app-grafico-atividades-concluidas',
  templateUrl: './grafico-atividades-concluidas.component.html',
  styleUrls: ['./grafico-atividades-concluidas.component.scss']
})
export class GraficoAtividadesConcluidasComponent implements OnInit {

  chartSeries: ApexNonAxisChartSeries = [40, 32, 28, 55];

  chartDetails: ApexChart = {
    type: 'donut',
    toolbar: {
      show: false
    }
  };

  chartLabels = ["Apple", "Microsoft", "Facebook", "Google"];

  /*
  chartTitle: ApexTitleSubtitle = {
    text: 'Leading Companies',
    align: 'center'
  };
  */

  chartDataLabels: ApexDataLabels = {
    enabled: true
  };


  constructor() { 
  
  }

  ngOnInit(): void {
  }

}
