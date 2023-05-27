import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonTasksService {

  constructor() { }

  private imagemAtualizada = new Subject<string>();

  imagemAtualizada$ = this.imagemAtualizada.asObservable();

  atualizarImagem(imagem: string) {
    this.imagemAtualizada.next(imagem);
  }
}
