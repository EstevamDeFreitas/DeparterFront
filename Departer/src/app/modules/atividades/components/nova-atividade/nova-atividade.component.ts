import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nova-atividade',
  templateUrl: './nova-atividade.component.html',
  styleUrls: ['./nova-atividade.component.scss']
})
export class NovaAtividadeComponent implements OnInit {

  dataAtual: Date = new Date();
  data: Date | null = null;

  constructor(private router: Router,private route: ActivatedRoute,private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    this.maskDate();
  }
  maskDate() {
    // Mask Date Input
    var input = document.querySelectorAll('.mask-date')[0];
    var dateInputMask = function dateInputMask(elm: any ) {
      if(elm !== undefined){
      elm.addEventListener('keypress', function(e: any) {
        if(e.keyCode < 47 || e.keyCode > 57) {
          e.preventDefault();
        }

        var len = elm.value.length;
        if(len !== 1 || len !== 3) {
          if(e.keyCode == 47) {
            e.preventDefault();
          }
        }
        if(len === 2) {
          elm.value += '/';
        }
        if(len === 5) {
          elm.value += '/';
        }
      });
    }
    };
    dateInputMask(input);
    // Fim Mask Date Input
  }


  cancelar(){
    this.router.navigate(['/atividades/lista-atividades']);
  }

  public atividadeCriada(): void {
    /*
    //TRATAR DATA - PADRÃO API

    //CONVERTE A DATA PARA O PADRÃO AMERICANO PORÉM AGORA UTC
    let novaData: any;
    novaData  = this.data?.toJSON();
   console.log(novaData);

   //ESSA FUNÇÃO TEM QUE SER ADABTADA MAS VAI SERVIR CASO O PADRÃO TENHA QUE SER BRASILEIRO NO BACK
   PADRÃO QUE ESTA 2023-1-13
   PADRÃO BRASILEIRO 13-1-2023
    formatDate2(date: string | null) {
    if (date !== null && date !== '') {
      const day: string = date.split("-")[2];
      const month: string = date.split("-")[1];
      const year: string = date.split("-")[0];

      const newDate: string = `${day}/${month}/${year}`;

      return newDate;
    } else {
      return date;
    }
  }
   */
    this.router.navigate(['/atividades/atividade'])
  }

}
