import { FuncionarioDto } from '../../shared/models/funcionarioDto';
import { ResponseBase } from 'src/app/modules/shared/models/response';
import { loginDto } from '../models/loginDto';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUlr = environment.api + "/Funcionario"

  constructor(private http : HttpClient) { }

  static getToken() : string | null{
    return localStorage.getItem('token');
  }

  static setToken(token : string){
    localStorage.setItem('token', token);
  }

  static removeToken() {
    localStorage.removeItem('token');
  }

  public login(user : loginDto) : Observable<ResponseBase<string>>{
    return this.http.post<ResponseBase<string>>(this.apiUlr + "/login", user);
  }

  public register(user : FuncionarioDto) : Observable<ResponseBase<undefined>>{
    return this.http.post<ResponseBase<undefined>>(this.apiUlr, user);
  }
}
