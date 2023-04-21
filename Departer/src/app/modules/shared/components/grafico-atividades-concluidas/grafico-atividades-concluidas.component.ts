import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexOptions, ApexPlotOptions, ApexTitleSubtitle } from 'ng-apexcharts';
import { GraficosService } from '../../services/graficos.service';
import { GraficoAtividadesConcluidasDto } from '../../models/graficosDto';
import { FuncionarioDto } from '../../models/funcionarioDto';
import { FuncionarioService } from 'src/app/modules/configuracoes/services/funcionario.service';


@Component({
  selector: 'app-grafico-atividades-concluidas',
  templateUrl: './grafico-atividades-concluidas.component.html',
  styleUrls: ['./grafico-atividades-concluidas.component.scss']
})
export class GraficoAtividadesConcluidasComponent implements OnInit {

  @Input() funcionarioId: string = "";
  @Input() departamentoId?: string = "";

  dadosGrafico: boolean = false;

  funcionario!: FuncionarioDto;

  atividadesConcluidas!: GraficoAtividadesConcluidasDto;

  chartSeries: ApexNonAxisChartSeries = [];

  chartDetails: ApexChart = {
    type: 'donut',
    toolbar: {
      show: false
    },
    
  };

  chartLabels = ["Finalizadas", "Atrasadas", "Pendente", "Em Desenvolvimento"];

  colors = [ 
    "#35DA3B",
    "#FF3A3A",
    "#FFF700",
    "#542FEA"
];



  /*
  chartTitle: ApexTitleSubtitle = {
    text: 'Leading Companies',
    align: 'center'
  };
  */

  chartDataLabels: ApexDataLabels = {
    enabled: true,
    
  };

  constructor(private graficoService: GraficosService, private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    if(this.funcionarioId == undefined){
    this.getAtividadesConcluidas();
    }else{
      this.getAtividadesConcluidas2();
    }

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

  getAtividadesConcluidas2(){


    let funcionarioId = "";

    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) => {
        this.funcionario = res.data;
        funcionarioId= this.funcionario.id;


        this.graficoService.getAtividadeResumo(0,funcionarioId,this.departamentoId).subscribe({
          next: (response) => {
            this.atividadesConcluidas = response.data;
            console.log(this.atividadesConcluidas);
            this.getGraficoMontado();
          },
          error: (response) => {
            
          }
        });
        

      }
    );


  }

  getGraficoMontado(){

    if(this.atividadesConcluidas.finalizadas == 0 && this.atividadesConcluidas.atrasadas == 0 && this.atividadesConcluidas.pendente == 0 && this.atividadesConcluidas.emDesenvolvimento == 0){
      this.dadosGrafico = false;

    }else{
      this.dadosGrafico = true;
    this.chartSeries = [this.atividadesConcluidas.finalizadas,this.atividadesConcluidas.atrasadas,this.atividadesConcluidas.pendente,this.atividadesConcluidas.emDesenvolvimento];
    }

  }

  plotOptions: ApexPlotOptions = {
    pie: {
      startAngle: 0,
      endAngle: 360,
      expandOnClick: true,
      offsetX: 0,
      offsetY: 0,
      customScale: 1,
      dataLabels: {
          offset: 0,
          minAngleToShowLabel: 10
      }, 
      donut: {
        size: '65%',
        background: 'transparent',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            color: undefined,
            offsetY: -5,
          },
          value: {
            show: true,
            fontSize: '18px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            color: '#676767',
            offsetY: 10,
          },
          total: {
            show: true,
            showAlways: false,
            label: 'Total',
            fontSize: '20px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            color: '#676767',
            
          }
        }
      },      
    }
  }  



}
