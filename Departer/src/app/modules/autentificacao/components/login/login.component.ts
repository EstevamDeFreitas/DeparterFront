import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';
import { SnackBarTheme } from 'src/app/modules/shared/models/snackbat.theme.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  hasError = false;
  errorMessage = "";

  get f(): any {
    return this.loginForm.controls;
  }

  constructor(private authService:AuthService, private router: Router, private readonly snackbarComponent: SnackbarComponent) { }


  ngOnInit(): void {

    this.formValidation();

  }

  public formValidation(){
    this.loginForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      senha : new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }


  public login(): void {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) =>{
          AuthService.setToken(res.data);
        },
        error: (err) => {
          this.hasError = true;
          this.errorMessage = err.error.message;
          this.snackbarComponent.openSnackBar("Senha ou email incorreto !", SnackBarTheme.error, 3000);
        },
        complete: () => {
          this.snackbarComponent.openSnackBar("Login realizado com sucesso !",SnackBarTheme.success,3000);
          this.irParaDashboard();
        }
      });
    } else {

    }
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

  public irParaDashboard(): void {
    this.router.navigate(["/home/dashboard"]);
  }

  public irParaESqueceuSenhaEmail(){
    this.router.navigate([`/nova-senha-email`]);
  }

  public irParaCadastro(){
    this.router.navigate([`/cadastro`]);
  }

}
