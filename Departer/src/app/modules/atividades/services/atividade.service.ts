import { ChecklistDto } from './../models/checklistDto';
import { AtividadePostDto, AtividadeDto, AtividadeListDto } from './../models/atividadeDto';
import { Observable } from 'rxjs';
import { ResponseBase } from './../../shared/models/response';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  apiUlr = environment.api + "/Atividade";

  constructor(private http : HttpClient) { }

  public getAtividades(): Observable<ResponseBase<AtividadeListDto[]>> {
    return this.http.get<ResponseBase<AtividadeListDto[]>>(this.apiUlr);
  }

  public postAtividade(atividade: AtividadePostDto): Observable<ResponseBase<AtividadePostDto>> {
    return this.http.post<ResponseBase<AtividadePostDto>>(this.apiUlr, atividade)
  }

  public getAtividadeById(id: string): Observable<ResponseBase<AtividadeDto>> {
    return this.http.get<ResponseBase<AtividadeDto>>(`${this.apiUlr}/${id}`);
  }

  public updateAtividade(atividade: AtividadeDto): Observable<ResponseBase<AtividadeDto>> {
    return this.http.put<ResponseBase<AtividadeDto>>(this.apiUlr, atividade);
  }

  public deleteAtividade(id: string): Observable<ResponseBase<AtividadePostDto>> {
    return this.http.delete<ResponseBase<AtividadePostDto>>(`${this.apiUlr}/${id}`);
  }

  public postAtividadeCheck(checklist: ChecklistDto): Observable<ResponseBase<ChecklistDto>> {
    return this.http.post<ResponseBase<ChecklistDto>>(`${this.apiUlr}/check`, checklist)
  }

}
