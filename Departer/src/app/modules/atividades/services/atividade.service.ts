import { ChecklistDto } from './../models/checklistDto';
import { AtividadePostDto, AtividadeDto, AtividadeListDto } from './../models/atividadeDto';
import { Observable } from 'rxjs';
import { ResponseBase } from './../../shared/models/response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  apiUlr = environment.api + "/Atividade";

  constructor(private http : HttpClient) { }

  public getAtividades(isAdminSearch?: boolean): Observable<ResponseBase<AtividadeListDto[]>> {
    let params = new HttpParams();
    if (isAdminSearch) {
      params = params.set('isAdminSearch', isAdminSearch);
    }

    return this.http.get<ResponseBase<AtividadeListDto[]>>(this.apiUlr, { params });


  }

  public postAtividade(atividade: AtividadePostDto): Observable<ResponseBase<AtividadePostDto>> {
    return this.http.post<ResponseBase<AtividadePostDto>>(this.apiUlr, atividade)
  }

  public getAtividadeById(id: string, isAdminSearch?: boolean): Observable<ResponseBase<AtividadeDto>> {
    let params = new HttpParams();
    if (isAdminSearch) {
      params = params.set('isAdminSearch', isAdminSearch);
    }

    return this.http.get<ResponseBase<AtividadeDto>>(`${this.apiUlr}/${id}`, { params });
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

  public putAtividadeCheck(checklist: ChecklistDto): Observable<ResponseBase<ChecklistDto>> {
    return this.http.put<ResponseBase<ChecklistDto>>(`${this.apiUlr}/check`, checklist)
  }

  public deleteAtividadeCheck(idChecklist: string): Observable<ResponseBase<ChecklistDto>> {
    return this.http.delete<ResponseBase<ChecklistDto>>(`${this.apiUlr}/check/${idChecklist}`);
  }

}
