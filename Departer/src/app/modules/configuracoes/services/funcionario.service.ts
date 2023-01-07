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

  apiUlr = environment.api + "/Funcionario"

  constructor(private http : HttpClient) { }

  public getFuncionarioLogado(): Observable<ResponseBase<FuncionarioDto>> {
    return this.http.get<ResponseBase<FuncionarioDto>>(`${this.apiUlr}/account/my`);
  }

  public putFuncionario(funcionario: FuncionarioDto): Observable<ResponseBase<FuncionarioDto>> {
    return this.http.put<ResponseBase<FuncionarioDto>>(this.apiUlr, funcionario);
  }



}
