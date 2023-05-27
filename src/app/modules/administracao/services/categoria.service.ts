import { AuthService } from './../../autentificacao/services/auth.service';
import { ResponseBase } from '../../shared/models/response';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoriaDto } from './../models/categoriaDto';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  apiUlr = environment.api + "/Categoria"

  constructor(private http : HttpClient) { }

  public getCategorias(): Observable<ResponseBase<CategoriaDto[]>> {
    return this.http.get<ResponseBase<CategoriaDto[]>>(this.apiUlr);
  }

  public postCategoria(categoria: CategoriaDto): Observable<ResponseBase<CategoriaDto>> {
    return this.http.post<ResponseBase<CategoriaDto>>(this.apiUlr, categoria)
  }

  public getCategoriaById(id: string): Observable<ResponseBase<CategoriaDto>> {
    return this.http.get<ResponseBase<CategoriaDto>>(`${this.apiUlr}/${id}`)
  }

  public putCategoria(categoria: CategoriaDto): Observable<ResponseBase<CategoriaDto>> {
    return this.http.put<ResponseBase<CategoriaDto>>(this.apiUlr, categoria)
  }

  public deleteCategoria(id: string): Observable<ResponseBase<String>> {
    return this.http.delete<ResponseBase<String>>(`${this.apiUlr}/${id}`)
  }

}
