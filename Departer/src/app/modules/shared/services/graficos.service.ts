import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  private readonly API = environment.api;

  constructor(private http: HttpClient) { }

  getAtividadeResumo(){

  }

  getHorasPorcategoria(){

  }
}
