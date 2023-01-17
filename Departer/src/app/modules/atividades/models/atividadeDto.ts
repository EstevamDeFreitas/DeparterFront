import { AtividadeCategorias } from './atividadeCategorias';
import { AtividadeFuncionarios, AtividadeGetFuncionarios } from './atividadeFuncionarios';

export class AtividadeDto {
  id: string = "";
  titulo: string = "";
  descricao: string = "";
  dataEntrega: string = "";
  tempoPrevisto: number = 0;
  atividadePaiId: string = "";
  categorias: string[] = [];
  atividadeFuncionarios = {} as AtividadeFuncionarios[];

}

export class AtividadeGetDto {
  id: string = "";
  titulo: string = "";
  descricao: string = "";
  dataEntrega: string = "";
  tempoPrevisto: number = 0;
  atividadePaiId: string = "";
  atividadeCategorias = [] as AtividadeCategorias[];
  atividadeFuncionarios = {} as AtividadeGetFuncionarios[];

}
