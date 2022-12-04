import { FuncionarioDto } from './../../models/funcionarioDto';
import { ValidatorField } from './../../../../helpers/ValidatorField';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators, AbstractControlOptions } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  registerForm!: FormGroup;
  parteCadastroInicial = true;

  hasError = false;
  errorMessage = "";

  get f(): any {
    return this.registerForm.controls;
  }

  constructor(private authService: AuthService, private router: Router) { }




  ngOnInit(): void {
    this.registerValidation();
  }

  public registerValidation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmarSenha')
    }

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', [Validators.required, Validators.minLength(5)]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmarSenha: new FormControl('', [Validators.required]),
      apelido: new FormControl('', [Validators.required]),
      imagem: new FormControl('', [Validators.required]),
    }, formOptions);
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

  public register(): void {
    if (this.registerForm.valid) {

      let funcionario: FuncionarioDto = this.registerForm.value;

      this.authService.register(funcionario).subscribe(
        (res) => {},
        (err) => {
          this.hasError = true;
          this.errorMessage = err.error.message;
        },
        () => {
          this.goToLogin()
        }
      )
    } else {
      //aqui sera chamado um alerta/toastr.
    }
  }

  public changeRegisterSection(): void {
    this.parteCadastroInicial = !this.parteCadastroInicial;
  }

  public checkIfUserCanContinue(): void {
    if(this.f.nome.valid && this.f.email.valid && this.f.senha.valid && this.f.confirmarSenha.valid){
      this.changeRegisterSection()
    } else {
      //aqui sera chamado um alerta/toastr
    }
  }

  public goToLogin(): void {
    this.router.navigate([""]);
  }

}
