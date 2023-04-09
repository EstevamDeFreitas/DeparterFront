import { Component, Input, OnInit } from '@angular/core';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexDataLabels,ApexTitleSubtitle,ApexStroke,ApexGrid} from "ng-apexcharts";
import { GraficosService } from '../../services/graficos.service';
import { GraficoHorasCategoriasDto } from '../../models/graficosDto';

@Component({
  selector: 'app-grafico-horas-categorias',
  templateUrl: './grafico-horas-categorias.component.html',
  styleUrls: ['./grafico-horas-categorias.component.scss']
})
export class GraficoHorasCategoriasComponent implements OnInit {

  @Input() funcionarioId: string = "";
  @Input() departamentoId?: string = "";

  horasCategorias: GraficoHorasCategoriasDto[] = [];

  
  chartSeries: ApexAxisChartSeries = [
    /*
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    },
    {
      name: "Samrtphones",
      data: [7, 25, 8, 1, 49, 62, 32, 256, 148]
    }*/
  ];

  chartDetails: ApexChart = {
    height: 200,
    type: 'line',
    zoom: {
      enabled: false
    }
  };

  chartLabels: ApexDataLabels = {
    enabled: false
  }

  chartStroke: ApexStroke = {
    curve:"straight"
  }

  /*
  chartTitle: ApexTitleSubtitle = {
    text: "Product Trends by Month",
    align: "left"
  }
  */

  chartGrid: ApexGrid = {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5
    }
  }

  chartXaxis: ApexXAxis = {
    /*
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep"
    ]*/
  }

  constructor(private graficoService: GraficosService) { }

  ngOnInit(): void {
    this.getHorasCategorias();
  }

  getHorasCategorias(){

    this.graficoService.getHorasPorcategoria(this.funcionarioId,this.departamentoId).subscribe({
      next: (response) => {
        this.horasCategorias = response.data;
        console.log(this.horasCategorias);
      },
      error: (response) => {
        
      }
    });


  }

  montarGrafico(){

  }


}
