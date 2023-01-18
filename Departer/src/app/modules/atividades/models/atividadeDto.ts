import { AtividadeCategorias } from './atividadeCategorias';
import { AtividadePostFuncionarios, AtividadeFuncionarios } from './atividadeFuncionarios';

export class AtividadeDto {
  id: string = "";
  titulo: string = "";
  descricao: string = "";
  dataEntrega: string = "";
  tempoPrevisto: number = 0;
  atividadePaiId: string = "";
  atividadeCategorias = {} as AtividadeCategorias[];
  atividadeFuncionarios = {} as AtividadeFuncionarios[];
  atividades = {} as AtividadeDto[];
}

export class AtividadePostDto {
  id: string = "";
  titulo: string = "";
  descricao: string = "";
  dataEntrega: string = "";
  tempoPrevisto: number = 0;
  atividadePaiId: string = "";
  categorias: string[] = [];
  atividadeFuncionarios = {} as AtividadePostFuncionarios[];
}


