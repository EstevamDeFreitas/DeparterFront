import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-modal-informacoes',
  templateUrl: './modal-informacoes.component.html',
  styleUrls: ['./modal-informacoes.component.scss']
})
export class ModalInformacoesComponent implements OnInit {

  hasError = false;
  errorMessage = "";

  constructor(public dialogRef: MatDialogRef<ModalInformacoesComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.dialogRef.close();
  }

}
