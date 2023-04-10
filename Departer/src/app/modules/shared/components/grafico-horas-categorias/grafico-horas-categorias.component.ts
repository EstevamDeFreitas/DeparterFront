import { Component, Input, OnInit } from '@angular/core';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexDataLabels,ApexTitleSubtitle,ApexStroke,ApexGrid} from "ng-apexcharts";
import { GraficosService } from '../../services/graficos.service';
import { GraficoHorasCategoriasDto } from '../../models/graficosDto';
import { FuncionarioDto } from '../../models/funcionarioDto';
import { FuncionarioService } from 'src/app/modules/configuracoes/services/funcionario.service';

@Component({
  selector: 'app-grafico-horas-categorias',
  templateUrl: './grafico-horas-categorias.component.html',
  styleUrls: ['./grafico-horas-categorias.component.scss']
})
export class GraficoHorasCategoriasComponent implements OnInit {

  @Input() funcionarioId: string = "";
  @Input() departamentoId?: string = "";

  funcionario!: FuncionarioDto;

  horasCategorias: GraficoHorasCategoriasDto[] = [];
  series: any[] = [];
  categories: any[] = [];
  
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

    categories: []
  }

  constructor(private graficoService: GraficosService, private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    if(this.funcionarioId == undefined){
      this.getHorasCategorias();
      }else{
        this.getHorasCategorias2();
      }
  
    this.getHorasCategorias();
  }

  getHorasCategorias(){

    
    console.log("usbudbdbdbdubdubduybd")

    let funcionarioId = "";

    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) => {
        this.funcionario = res.data;
        funcionarioId= this.funcionario.id;

        this.graficoService.getHorasPorcategoria(funcionarioId,this.departamentoId).subscribe({
          next: (response) => {
            this.horasCategorias = response.data;
            console.log(this.horasCategorias);
            this.montarGrafico();
          },
          error: (response) => {
            
          }
        });

      }
    );


  }

  getHorasCategorias2(){

  }

  montarGrafico(){

    this.horasCategorias.forEach((value) => {
      let obj = {
        name: "",
        data: [0]
      }

      obj.name = value.categoria;
      obj.data.push(value.horas)

      this.series.push(obj)

      this.categories.push(value.categoria)
    }
    );

    console.log(this.series)
    this.chartSeries = this.series;
    this.chartXaxis.categories = this.categories; 
    
  }


}
