import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModoAdminService {

constructor() { }
  modoAdmin: boolean = true;

  alterarModoAdmin(estado: boolean) {
    this.modoAdmin = estado;
  }
}
