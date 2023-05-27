import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModoAdminService {

  constructor() { }
  private modoAdminSubject = new BehaviorSubject<boolean>(false);
  modoAdmin$ = this.modoAdminSubject.asObservable();

  alterarModoAdmin(estado: boolean) {
    this.modoAdminSubject.next(estado);
  }
}
