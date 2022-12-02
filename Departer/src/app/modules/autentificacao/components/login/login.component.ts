import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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

  constructor(private authService:AuthService) { }


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
        }
      });
    } else {

    }
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

}
