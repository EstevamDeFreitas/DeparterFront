import { AuthService } from './../../autentificacao/services/auth.service';
import { ResponseBase } from './../../../models/response';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoriaDto } from './../models/categoriaDto';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public token= AuthService.getToken();
  public head_obj = new HttpHeaders().set("Authorization", "bearer "+this.token)

  apiUlr = environment.api + "/Categoria"

  constructor(private http : HttpClient) { }

  public getCategorias(): Observable<ResponseBase<CategoriaDto[]>> {
    return this.http.get<ResponseBase<CategoriaDto[]>>(this.apiUlr, {headers: this.head_obj});
  }

  public postCategoria(categoria: CategoriaDto): Observable<ResponseBase<CategoriaDto>> {
    return this.http.post<ResponseBase<CategoriaDto>>(this.apiUlr, categoria, {headers: this.head_obj})
  }

  public getCategoriaById(id: string): Observable<ResponseBase<CategoriaDto>> {
    return this.http.get<ResponseBase<CategoriaDto>>(`${this.apiUlr}/${id}`, {headers: this.head_obj})
  }

  public putCategoria(categoria: CategoriaDto): Observable<ResponseBase<CategoriaDto>> {
    return this.http.put<ResponseBase<CategoriaDto>>(this.apiUlr, categoria, {headers: this.head_obj})
  }

}
