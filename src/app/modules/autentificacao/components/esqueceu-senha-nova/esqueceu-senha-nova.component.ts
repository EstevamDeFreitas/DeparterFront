import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';
import { SnackBarTheme } from 'src/app/modules/shared/models/snackbat.theme.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-esqueceu-senha-nova',
  templateUrl: './esqueceu-senha-nova.component.html',
  styleUrls: ['./esqueceu-senha-nova.component.scss']
})
export class EsqueceuSenhaNovaComponent implements OnInit {

  senhaForm!: FormGroup;

  hasError = false;
  errorMessage = "";

  get f(): any {
    return this.senhaForm.controls;
  }

  constructor(private authService:AuthService, private router: Router, private readonly snackbarComponent: SnackbarComponent) { }

  ngOnInit(): void {
    this.formValidation();
  }

  public formValidation(){
    this.senhaForm = new FormGroup({
      senha : new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmarSenha : new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  trocarSenha(){

    if(this.senhaForm.value.senha != this.senhaForm.value.confirmarSenha ){
      this.snackbarComponent.openSnackBar("O campo de Senha e Confirmar Senha não são correspontentes !", SnackBarTheme.error, 3000);
    }else{

    }

  }
   
  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

}
