import { FuncionarioDto } from './../../shared/models/funcionarioDto';
import { ResponseBase } from './../../shared/models/response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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

  public getAll(): Observable<ResponseBase<FuncionarioDto[]>>{
    return this.http.get<ResponseBase<FuncionarioDto[]>>(this.apiUlr + '/all');
  }

  public getFuncionarioById(id: string): Observable<ResponseBase<FuncionarioDto>>{
    return this.http.get<ResponseBase<FuncionarioDto>>(`${this.apiUlr}?id=${id}`);
  }

  public postUpload(funcionarioId: string, file: any): Observable<ResponseBase<FuncionarioDto>> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http.post<ResponseBase<FuncionarioDto>>(`${this.apiUlr}/upload-image/${funcionarioId}`, formData);
  }


}
