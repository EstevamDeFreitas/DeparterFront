import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';
import { FuncionarioDto } from 'src/app/modules/shared/models/funcionarioDto';
import { SnackBarTheme } from 'src/app/modules/shared/models/snackbat.theme.enum';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-modal-editar-perfil-img',
  templateUrl: './modal-editar-perfil-img.component.html',
  styleUrls: ['./modal-editar-perfil-img.component.scss']
})
export class ModalEditarPerfilImgComponent implements OnInit {

  funcionario!: FuncionarioDto;

  constructor(public dialogRef: MatDialogRef<ModalEditarPerfilImgComponent>, @Inject(MAT_DIALOG_DATA) public data: FuncionarioDto,private funcionarioService: FuncionarioService,
   private readonly snackbarComponent: SnackbarComponent) {
    this.funcionario = data;
   }

  ngOnInit(): void {
  }

  onConfirm(): void {
    if(this.funcionario.imagem == ""){
      this.dialogRef.close(true);
    }else{
    this.dialogRef.close(this.funcionario.imagem);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  public changeFuncionario(): void {
  
      this.funcionarioService.putFuncionario(this.funcionario).subscribe(
        (res) => {
        },
        (err) => {
          this.snackbarComponent.openSnackBar("Erro ao alterar a imagem!", SnackBarTheme.error, 3000);
        },
        
      );
  }

}
