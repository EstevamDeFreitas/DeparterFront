import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MudarCorFonteService {

  constructor() { }

  mudarCorDaFonte(cor: string){

    switch(cor){
      case "#5245E0":
        return "#d6d3f8"
      case "#25da4c":
        return "#d3f8db"
      case "#B845E0":
        return "#efd3f8"
      case "#E04545":
        return "#f8d3d3"
      case "#E0B545":
        return "#f8edd3"
      case "#4596E0":
        return "#e9f3fc"
      default:
        return "#000000"
    }

  }
}
