import { DepartamentoDto } from './../models/departamentoDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseBase } from '../../shared/models/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private readonly API = environment.api;

  constructor(private http: HttpClient) { }

  public getDepartamentos(): Observable<ResponseBase<DepartamentoDto[]>> {
    return this.http.get<ResponseBase<DepartamentoDto[]>>(`${this.API}/Departamento`);
  }

  public createDepartamento(departamento: DepartamentoDto): Observable<ResponseBase<DepartamentoDto>> {
    return this.http.post<ResponseBase<DepartamentoDto>>(`${this.API}/Departamento`, departamento);
  }

  public getDepartamentoById(id: string): Observable<ResponseBase<DepartamentoDto>> {
    return this.http.get<ResponseBase<DepartamentoDto>>(`${this.API}/Departamento/${id}`);
  }

  public deleteDepartamentoById(id: string): Observable<ResponseBase<DepartamentoDto>> {
    return this.http.delete<ResponseBase<DepartamentoDto>>(`${this.API}/Departamento/${id}`);
  }

  public editarDepartamento(departamento: DepartamentoDto): Observable<ResponseBase<DepartamentoDto>> {
    return this.http.put<ResponseBase<DepartamentoDto>>(`${this.API}/Departamento`, departamento);
  }

  public createDepartamentoFuncionario(departamentoId: string,arrayFuncionario: Array<string>): Observable<ResponseBase<any>> {
    return this.http.post<ResponseBase<any>>(`${this.API}/Departamento/funcionario?departamentoId=${departamentoId}`, arrayFuncionario);
  }

  public deleteDepartamentoFuncionario(departamentoId: string,arrayFuncionario: Array<string>) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        arrayFuncionario
      },
    };
    return this.http.delete<ResponseBase<any>>(`${this.API}/Departamento/funcionario?departamentoId=${departamentoId}`, options);
  }
}
