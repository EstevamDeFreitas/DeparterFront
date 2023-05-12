import { ModalEditarPerfilImgComponent } from './../modal-editar-perfil-img/modal-editar-perfil-img.component';
import { SnackBarTheme } from './../../../shared/models/snackbat.theme.enum';
import { SnackbarComponent } from './../../../shared/components/snackbar/snackbar.component';
import { Router } from '@angular/router';
import { ValidatorField } from './../../../../helpers/ValidatorField';
import { FormGroup, FormControl, Validators, AbstractControlOptions } from '@angular/forms';
import { FuncionarioDto } from './../../../shared/models/funcionarioDto';
import { FuncionarioService } from './../../services/funcionario.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { CommonTasksService } from 'src/app/modules/shared/services/common-tasks.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  funcionario!: FuncionarioDto;
  modoEditar = false;
  editUserForm!: FormGroup;

  @ViewChild('nome') nome!: ElementRef;

  hasError = false;
  errorMessage = "";

  image: string = "";
  file: any;

  compare: boolean = false;


  get f(): any {
    return this.editUserForm.controls;
  }

  constructor(private funcionarioService: FuncionarioService, private router: Router, private readonly snackbarComponent: SnackbarComponent, public dialog: MatDialog,
    private commonTasksService : CommonTasksService) { }

  ngOnInit(): void {
    this.modoEditar = false;
    this.compare = false;
    this.getUser();
  }

  public getUser(): void {
    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) => {
        this.funcionario = res.data;
        this.image = environment.images + "/" + res.data.imagem;
      },
      () => {},
      () => this.userValidation()
    )
  }

  public userValidation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmarSenha')
    }

    this.editUserForm = new FormGroup({
      nome: new FormControl(this.funcionario.nome, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(this.funcionario.email, [Validators.required, Validators.email]),
      apelido: new FormControl(this.funcionario.apelido, [Validators.required]),
      senha: new FormControl(this.funcionario.senha, [Validators.required, Validators.minLength(6)]),
      confirmarSenha: new FormControl(this.funcionario.senha, [Validators.required]),
      imagem: new FormControl(this.funcionario.imagem),
    }, formOptions);
  }

  public changeFuncionario(): void {
    if(this.editUserForm.valid){
      let funcionarioPut = this.editUserForm.value;
      funcionarioPut.id = this.funcionario.id;

      console.log(this.compare)
      if(this.compare){
        funcionarioPut.imagem = this.image;
        console.log(funcionarioPut)
      }

      console.log(funcionarioPut)

      this.funcionarioService.putFuncionario(funcionarioPut).subscribe(
        (res) => {
          this.atualizarFuncionario(funcionarioPut.imagem);
          this.snackbarComponent.openSnackBar("Usúario alterado com sucesso !",SnackBarTheme.success,3000);
        },
        () => {},
        () => {this.ngOnInit();}
      );

    } else {
      //aviso
    }
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

  public changeEditMode(): void {
    this.modoEditar = !this.modoEditar;
    if(this.modoEditar)
      this.nome.nativeElement.focus();
    this.userValidation();
  }

  public changeUserImg(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    dialogConfig.data = this.funcionario;

    const dialogRef = this.dialog.open(ModalEditarPerfilImgComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      console.log(data)

      if(data == false){
        this.compare = false;
      }else{
        if(data == true){
          this.image = "";
        }else{
        this.image = data;
        }
        this.compare = true;
      }
    });

  }

  atualizarFuncionario(imagem: string) {
    this.commonTasksService.atualizarImagem(imagem);
  }

  onFileChange(evento: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => this.image = event.target.result

    this.file = evento.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }

  uploadImagem(): void {
    this.funcionarioService.postUpload(this.funcionario.id, this.file).subscribe(
      ()=>{

      },
      (error: any)=>{

        console.error(error);
      },
    )
  }

  public substituirImagem(evento: Event): void {
    const imagem = evento.target as HTMLImageElement;
    imagem.onerror = null;
    imagem.src = "../../../../../assets/images/default-image.png";
  }


}
