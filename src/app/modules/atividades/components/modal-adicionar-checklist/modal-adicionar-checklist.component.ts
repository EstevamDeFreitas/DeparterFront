import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChecklistDto } from './../../models/checklistDto';
import { AtividadeService } from './../../services/atividade.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-modal-adicionar-checklist',
  templateUrl: './modal-adicionar-checklist.component.html',
  styleUrls: ['./modal-adicionar-checklist.component.scss']
})
export class ModalAdicionarChecklistComponent implements OnInit {

  hasError = false;
  errorMessage = "";

  checklistForm!: FormGroup

  checklist = {} as ChecklistDto;
  atividadeId: string = "";

  estado: string = "post"

  get f(): any {
    return this.checklistForm.controls;
  }

  constructor(public dialogRef: MatDialogRef<ModalAdicionarChecklistComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private atividadeService: AtividadeService) {
    this.atividadeId = data.idAtividade
    this.checklist = data.checklist;
  }

  ngOnInit(): void {
    this.estado = "post"
    this.formValidation();
  }

  public formValidation() {
    this.checklistForm = new FormGroup({
      descricao: new FormControl('', [Validators.required]),
    });

    this.checarSePutOuPost()
  }

  checarSePutOuPost(){

    if(this.checklist.descricao){
      this.estado = "put"
      this.checklistForm.controls['descricao'].setValue(this.checklist.descricao);
    }

  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }



  onConfirm(): void {

    if(this.checklistForm.valid){
      let checklistFinal = {} as ChecklistDto;
      checklistFinal.checked = false;
      checklistFinal.atividadeId = this.atividadeId
      checklistFinal.descricao = this.checklistForm.controls['descricao'].value;

      if(this.estado == "post"){
        this.atividadeService.postAtividadeCheck(checklistFinal).subscribe(
          (res) => {
            this.dialogRef.close("adicionada");
          },
          () => {}
        );
      } else {
        checklistFinal.id = this.checklist.id
        this.atividadeService.putAtividadeCheck(checklistFinal).subscribe(
          (res) => {
            this.dialogRef.close("alterada");
          },
          () => {}
        );
      }


    }


  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
