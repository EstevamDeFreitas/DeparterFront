import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-informacao-nao-configurado',
  templateUrl: './modal-informacao-nao-configurado.component.html',
  styleUrls: ['./modal-informacao-nao-configurado.component.scss']
})
export class ModalInformacaoNaoConfiguradoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalInformacaoNaoConfiguradoComponent>) { }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.dialogRef.close();
  }

}
