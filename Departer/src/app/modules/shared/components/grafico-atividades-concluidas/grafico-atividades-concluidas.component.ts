import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexOptions, ApexTitleSubtitle } from 'ng-apexcharts';
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
    }
  };

  chartLabels = ["Finalizadas", "Atrasadas", "Pendente"];

  colors = [ 
    "#35DA3B",
    "#FF3A3A",
    "#FFF700"
];



  /*
  chartTitle: ApexTitleSubtitle = {
    text: 'Leading Companies',
    align: 'center'
  };
  */

  chartDataLabels: ApexDataLabels = {
    enabled: true
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

    if(this.atividadesConcluidas.finalizadas == 0 && this.atividadesConcluidas.atrasadas == 0 && this.atividadesConcluidas.pendente == 0){
      this.dadosGrafico = false;

    }else{
      this.dadosGrafico = true;
    this.chartSeries = [this.atividadesConcluidas.finalizadas,this.atividadesConcluidas.atrasadas,this.atividadesConcluidas.pendente];
    }

  }



}
