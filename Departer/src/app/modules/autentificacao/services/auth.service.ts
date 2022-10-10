import { ResponseBase } from './../models/response';
import { userDto } from './../models/userDto';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUlr = environment.api + "/user"

  constructor(private http : HttpClient) { }

  static getToken() : string | null{
    return localStorage.getItem('token');
  }

  static setToken(token : string){
    localStorage.setItem('token', token);
  }

  public login(user : userDto) : Observable<ResponseBase<string>>{
    return this.http.post<ResponseBase<string>>(this.apiUlr + "/login", user);
  }

  public register(user : userDto) : Observable<ResponseBase<undefined>>{
    return this.http.post<ResponseBase<undefined>>(this.apiUlr, user);
  }
}
