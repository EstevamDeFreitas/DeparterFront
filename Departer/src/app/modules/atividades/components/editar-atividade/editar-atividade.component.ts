import { ModalExcluirDesativarComponent } from './../../../shared/components/modal-excluir-desativar/modal-excluir-desativar.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-editar-atividade',
  templateUrl: './editar-atividade.component.html',
  styleUrls: ['./editar-atividade.component.scss']
})
export class EditarAtividadeComponent implements OnInit {

  dataAtual: Date = new Date();
  data: Date | null = null;

  constructor(private router: Router,private route: ActivatedRoute,public dialog: MatDialog,private dateAdapter: DateAdapter<Date>) { 
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


  desativarAtividade(){

    let dataDialog = {
      title: "Você realmente deseja desativar?",
      message: "Você pode ativar novamente caso queira ou seja necessário.",
      cancel: "Não, gostaria de voltar",
      confirm: "Sim, desejo desativar"
    }

    const dialogRef = this.dialog.open(ModalExcluirDesativarComponent, {
      panelClass: 'custom-modal',
      backdropClass: 'backdrop-blur',
      width: '600px',
      height: 'auto',
      data:dataDialog,
    }).afterClosed().subscribe(result => {

      if(result==true){
      
        }
        
      
    });
  }

  editarAtividade(){
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
  }

  cancelar(){
    this.router.navigate(['/atividades/lista-atividades']);
  }

}
