import { GetAtividadeByDepartamentoId } from './../models/atividadeDto';
import { DepartamentoDto } from './../models/departamentoDto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  public getDepartamentos(isAdminSearch?: boolean): Observable<ResponseBase<DepartamentoDto[]>> {
    let params = new HttpParams();
    if (isAdminSearch) {
      params = params.set('isAdminSearch', isAdminSearch);
    }

    return this.http.get<ResponseBase<DepartamentoDto[]>>(`${this.API}/Departamento`, { params });
  }

  public createDepartamento(departamento: DepartamentoDto): Observable<ResponseBase<DepartamentoDto>> {
    return this.http.post<ResponseBase<DepartamentoDto>>(`${this.API}/Departamento`, departamento);
  }

  public getDepartamentoById(id: string, isAdminSearch?: boolean): Observable<ResponseBase<DepartamentoDto>> {
    let params = new HttpParams();
    if (isAdminSearch) {
      params = params.set('isAdminSearch', isAdminSearch);
    }

    return this.http.get<ResponseBase<DepartamentoDto>>(`${this.API}/Departamento/${id}`, { params });
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
    return this.http.post<ResponseBase<any>>(`${this.API}/Departamento/funcionario/delete?departamentoId=${departamentoId}`, arrayFuncionario);
  }

  public getAtividadesbyDepartamentoId(departamentoId: string): Observable<ResponseBase<GetAtividadeByDepartamentoId[]>>{
    return this.http.get<ResponseBase<GetAtividadeByDepartamentoId[]>>(`${this.API}/Departamento/${departamentoId}/atividades/resumo`);
  }

  public postUpload(departamentoId: string, file: any): Observable<ResponseBase<DepartamentoDto>> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http.post<ResponseBase<DepartamentoDto>>(`${this.API}/Departamento/upload-image/${departamentoId}`, formData);
  }
}
