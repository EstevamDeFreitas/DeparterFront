import { HorasPorMesDTO } from './../../models/graficosDto';
import { Component, Input, OnInit } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle, ApexStroke, ApexGrid, ApexTooltip } from "ng-apexcharts";
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

  dadosGrafico: boolean = false;

  funcionario!: FuncionarioDto;

  horasCategorias: GraficoHorasCategoriasDto[] = [];
  series: any[] = [];
  series2: any[] = [];
  categories: any[] = [];

  cont: number = 0;

  chartSeries: ApexAxisChartSeries = [
    /*
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    },
    {
      name: "Samrtphones",
      data: [7, 25, 8, 1, 49, 62, 32, 256, 148]
    }
        {
          name: "Desktops",
          data: [{x:'2022-01-01', y:10},{x:'2022-02-01', y:15},{x:'2022-03-01', y:12}]
        },
        {
          name: "Smartphones",
          data: [{x:'2022-01-01', y:5},{x:'2022-02-01', y:7},{x:'2022-03-01', y:9}]
        }
    */
  ];

  chartToolTips: ApexTooltip = {
    x: {format:"MMM/yyyy"}
  }

  chartDetails: ApexChart = {
    height: 200,
    type: 'line',
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    }
  };

  chartLabels: ApexDataLabels = {
    enabled: false
  }

  chartStroke: ApexStroke = {
    curve: "straight"
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
   
    type: "datetime"
  }

  constructor(private graficoService: GraficosService, private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    if (this.funcionarioId == undefined) {
      this.getHorasCategorias();
    } else {
      this.getHorasCategorias2();
    }

    this.getHorasCategorias();
  }

  getHorasCategorias() {

    this.graficoService.getHorasPorcategoria(this.funcionarioId, this.departamentoId).subscribe({
      next: (response) => {
        this.horasCategorias = response.data;
        console.log(this.horasCategorias);
        this.montarGrafico();
      },
      error: (response) => {

      }
    });

  }

  getHorasCategorias2() {

    let funcionarioId = "";

    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) => {
        this.funcionario = res.data;
        funcionarioId = this.funcionario.id;

        this.graficoService.getHorasPorcategoria(funcionarioId, this.departamentoId).subscribe({
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

  montarGrafico() {

    if (this.horasCategorias.length == 0) {
      this.dadosGrafico = false;

    } else {

      this.dadosGrafico = true;

      /*
    this.horasCategorias.forEach((value) => {
      let obj :{
        name: string,
        data: any
      } = {name:"", data:[]}

      a++;

      console.log(a)

      obj.name = value.categoria;
      obj.data.push(value.horasPorMes)
      
      console.log(this.series)
      this.series.push(obj)

      this.categories.push(value.categoria)
    }
    );*/

      for (let i = 0; i < this.horasCategorias.length - 1; i++) {

        let obj: {
          name: string,
          data: any
        } = { name: "", data: [] }

        obj.name = this.horasCategorias[this.cont].categoria;
        obj.data.push(this.horasCategorias[this.cont].horasPorMes)

        this.series.push(obj)

        this.categories.push(this.horasCategorias[this.cont].categoria);
        this.cont = this.cont + 1;
      }

      if (this.cont == this.horasCategorias.length) {
        this.finalizarGrafico();
      }

    }

  }
  finalizarGrafico() {
    interface OriginalObject {
      data: string;
      valor: number;
    }

    console.log(this.series.length)

    for (let z = 0; z < this.series.length; z++) {
      let teste = this.series[z].data[0];


      const modifiedArray = teste.map((obj: any) => {

        return { x: obj.data, y: obj.valor };
      });

      this.series2.push(modifiedArray);

    }

    console.log(this.series2)

    
      for (let x = 0; x < this.series2.length; x++) {
        this.series[x].data = this.series2[x];
      }

      console.log(this.series)
      this.chartSeries = this.series;
      
  }

}
