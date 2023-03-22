import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-editar-perfil-img',
  templateUrl: './modal-editar-perfil-img.component.html',
  styleUrls: ['./modal-editar-perfil-img.component.scss']
})
export class ModalEditarPerfilImgComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalEditarPerfilImgComponent>) { }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }


}
