import { DepartamentoDto } from './../models/departamentoDto';
import { HttpClient } from '@angular/common/http';
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

  public createDepartamento(atividade: DepartamentoDto): Observable<ResponseBase<DepartamentoDto>> {
    return this.http.post<ResponseBase<DepartamentoDto>>(`${this.API}/Departamento`, atividade);
  }

  
}
