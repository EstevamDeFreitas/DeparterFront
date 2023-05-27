import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseBase } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  private readonly API = environment.api;

  constructor(private http: HttpClient) { }

  getAtividadeResumo(tempo: number,idFuncionario: string, idDepartamento?: string ): Observable<ResponseBase<any>>{
    return this.http.get<ResponseBase<any>>(`${this.API}/Atividade/resumo?tempo=${tempo}&funcionarioId=${idFuncionario}&departamentoId=${idDepartamento}`);
  }

  getHorasPorcategoria(idFuncionario: string, idDepartamento?: string): Observable<ResponseBase<any>>{
    return this.http.get<ResponseBase<any>>(`${this.API}/Horas/agrupamento/categorias?funcionarioId=${idFuncionario}&departamentoId=${idDepartamento}`);
  }
}
