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

  apiUlr = environment.api + "/Categoria"

  constructor(private http : HttpClient) { }

  public getCategorias(): Observable<ResponseBase<CategoriaDto[]>> {
    let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDk0YjljLTU1M2ItNDY1Mi04MTllLTEzODJlZTA0ZjdhMyIsIm5iZiI6MTY3MDQ4MzU5MSwiZXhwIjoxNjcwNTAxNTkxLCJpYXQiOjE2NzA0ODM1OTF9.ZsdwsUY3SEg_Xz6wY1zb2WimJgVAv0JUQ14tHiRVPbU";
    let head_obj = new HttpHeaders().set("Authorization", "bearer "+token)
    return this.http.get<ResponseBase<CategoriaDto[]>>(this.apiUlr, {headers: head_obj});
  }

  public insereCategoria(categoria: CategoriaDto): Observable<CategoriaDto> {
    return this.http.post<CategoriaDto>(this.apiUlr, categoria)
  }

}
