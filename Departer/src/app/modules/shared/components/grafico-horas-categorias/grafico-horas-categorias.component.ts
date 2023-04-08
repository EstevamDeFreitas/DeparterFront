import { Component, OnInit } from '@angular/core';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexDataLabels,ApexTitleSubtitle,ApexStroke,ApexGrid} from "ng-apexcharts";

@Component({
  selector: 'app-grafico-horas-categorias',
  templateUrl: './grafico-horas-categorias.component.html',
  styleUrls: ['./grafico-horas-categorias.component.scss']
})
export class GraficoHorasCategoriasComponent implements OnInit {

  chartSeries: ApexAxisChartSeries = [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    },
    {
      name: "Samrtphones",
      data: [7, 25, 8, 1, 49, 62, 32, 256, 148]
    }
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
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
