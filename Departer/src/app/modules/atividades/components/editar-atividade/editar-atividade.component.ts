import { ModalExcluirDesativarComponent } from './../../../shared/components/modal-excluir-desativar/modal-excluir-desativar.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-atividade',
  templateUrl: './editar-atividade.component.html',
  styleUrls: ['./editar-atividade.component.scss']
})
export class EditarAtividadeComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit(): void {
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

  cancelar(){
    this.router.navigate(['/atividades/lista-atividades']);
  }

}
