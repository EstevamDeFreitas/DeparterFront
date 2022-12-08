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

  public token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDk0YjljLTU1M2ItNDY1Mi04MTllLTEzODJlZTA0ZjdhMyIsIm5iZiI6MTY3MDUzODMzOCwiZXhwIjoxNjcwNTU2MzM4LCJpYXQiOjE2NzA1MzgzMzh9.l2HdAcRKPUWW63YV8GgTGOnFQKdYuFRjKPN8AAm_f3g";
  public head_obj = new HttpHeaders().set("Authorization", "bearer "+this.token)

  apiUlr = environment.api + "/Categoria"

  constructor(private http : HttpClient) { }

  public getCategorias(): Observable<ResponseBase<CategoriaDto[]>> {

    return this.http.get<ResponseBase<CategoriaDto[]>>(this.apiUlr, {headers: this.head_obj});
  }

  public insereCategoria(categoria: CategoriaDto): Observable<ResponseBase<CategoriaDto>> {
    return this.http.post<ResponseBase<CategoriaDto>>(this.apiUlr, categoria, {headers: this.head_obj})
  }

}
