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

  constructor(private authService:AuthService) { }


  hasError = false;
  errorMessage = "";

  ngOnInit(): void {

   this.loginForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

  }


  login(){
    this.authService.login({email: this.loginForm.controls['email'].value, password:this.loginForm.controls['password'].value}).subscribe({
      next: (res) =>{
        AuthService.setToken(res.data);
      },
      error: (err) => {
        this.hasError = true;
        this.errorMessage = err.error.message;
      }
    });
  }

}
