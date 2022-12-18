import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-excluir-desativar',
  templateUrl: './modal-excluir-desativar.component.html',
  styleUrls: ['./modal-excluir-desativar.component.scss']
})
export class ModalExcluirDesativarComponent implements OnInit {

  public title: string;
  public message: string;
  public confirm: string;
  public cancel: string;

  constructor(public dialogRef: MatDialogRef<ModalExcluirDesativarComponent>,@Inject(MAT_DIALOG_DATA) public data: ModalExcluirDesativarComponent) {
      this.title = data.title;
      this.message = data.message;
      this.confirm = data.confirm;
      this.cancel = data.cancel;
   }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
