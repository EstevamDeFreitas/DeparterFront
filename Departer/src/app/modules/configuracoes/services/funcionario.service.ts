import { FuncionarioDto } from './../../shared/models/funcionarioDto';
import { ResponseBase } from './../../shared/models/response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './../../autentificacao/services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  public token= AuthService.getToken();
  public head_obj = new HttpHeaders().set("Authorization", "bearer "+this.token);

  apiUlr = environment.api + "/Funcionario"

  constructor(private http : HttpClient) { }

  public getFuncionarioLogado(): Observable<ResponseBase<FuncionarioDto>> {
    return this.http.get<ResponseBase<FuncionarioDto>>(`${this.apiUlr}/account/my`, {headers: this.head_obj});
  }

  public putFuncionario(funcionario: FuncionarioDto): Observable<ResponseBase<FuncionarioDto>> {
    return this.http.put<ResponseBase<FuncionarioDto>>(this.apiUlr, funcionario, {headers: this.head_obj});
  }



}
