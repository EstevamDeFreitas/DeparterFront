import { ResumoDto } from './../models/resumoDto';
import { HorasPostDto, HorasGetByFuncionarioDto, HorasGetByAtividadeDto } from './../models/horasDto';
import { ResponseBase } from 'src/app/modules/shared/models/response';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HorasService {

  apiUlr = environment.api + "/Horas";

  constructor(private http : HttpClient) { }

  public getHoras(): Observable<ResponseBase<HorasPostDto>> {
    return this.http.get<ResponseBase<HorasPostDto>>(this.apiUlr);
  }

  public postHoras(horas: HorasPostDto): Observable<ResponseBase<HorasPostDto>> {
    return this.http.post<ResponseBase<HorasPostDto>>(this.apiUlr, horas)
  }

  public getHorasByAtividadeId(atividadeId: string): Observable<ResponseBase<HorasGetByAtividadeDto[]>> {
    return this.http.get<ResponseBase<HorasGetByAtividadeDto[]>>(`${this.apiUlr}/atividade/${atividadeId}`);
  }

  public getHorasByfuncionarioId(funcionarioId: string): Observable<ResponseBase<HorasGetByFuncionarioDto[]>> {
    return this.http.get<ResponseBase<HorasGetByFuncionarioDto[]>>(`${this.apiUlr}/funcionario/${funcionarioId}`);
  }

  public getHorasByfuncionarioIdAndAtividadeId(funcionarioId: string, atividadeId: string): Observable<ResponseBase<HorasGetByFuncionarioDto[]>> {
    return this.http.get<ResponseBase<HorasGetByFuncionarioDto[]>>(`${this.apiUlr}/funcionario/${funcionarioId}/atividade/${atividadeId}`);
  }

  public getResumoHoras(funcionarioId?: string, departamentoId?: string): Observable<ResponseBase<ResumoDto>> {
    let params = new HttpParams();
    if (funcionarioId) {
      params = params.set('funcionarioId', funcionarioId);
    }
    if (departamentoId) {
      params = params.set('departamentoId', departamentoId);
    }
    return this.http.get<ResponseBase<ResumoDto>>(`${this.apiUlr}/resumo`, { params });
  }

}
