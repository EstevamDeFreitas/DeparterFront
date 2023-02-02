import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-esqueceu-senha-email',
  templateUrl: './esqueceu-senha-email.component.html',
  styleUrls: ['./esqueceu-senha-email.component.scss']
})
export class EsqueceuSenhaEmailComponent implements OnInit {

  emailForm!: FormGroup;

  hasError = false;
  errorMessage = "";

  get f(): any {
    return this.emailForm.controls;
  }

  constructor(private authService:AuthService, private router: Router, private readonly snackbarComponent: SnackbarComponent) { }

  ngOnInit(): void {
    this.formValidation();
  }

  public formValidation(){
    this.emailForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
    });
  }

  enviar(){
    this.irParaTrocarSenha();
  }

  
  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

  irParaTrocarSenha(){
    this.router.navigate([`/nova-senha-confirmar`]);
  }

}
