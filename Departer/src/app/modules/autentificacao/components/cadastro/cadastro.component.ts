import { FuncionarioDto } from './../../models/funcionarioDto';
import { ValidatorField } from './../../../../helpers/ValidatorField';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators, AbstractControlOptions } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  registerForm!: FormGroup;

  hasError = false;
  errorMessage = "";

  get f(): any {
    return this.registerForm.controls;
  }

  constructor(private authService: AuthService) { }




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
    }, formOptions);
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

  public register(): void {
    if (this.registerForm.valid) {

      let funcionario: FuncionarioDto = this.registerForm.value;
      funcionario.imagem = "Teste";
      funcionario.apelido = "Teste";

      this.authService.register(funcionario).subscribe(
        (res) => {},
        (err) => {
          this.hasError = true;
          this.errorMessage = err.error.message;
        }
      )
    } else {

    }
  }

}
