import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-informacoes-modo-admin',
  templateUrl: './modal-informacoes-modo-admin.component.html',
  styleUrls: ['./modal-informacoes-modo-admin.component.scss']
})
export class ModalInformacoesModoAdminComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalInformacoesModoAdminComponent>) { }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.dialogRef.close();
  }

}
