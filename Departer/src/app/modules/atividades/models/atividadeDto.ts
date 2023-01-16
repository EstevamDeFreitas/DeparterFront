import { AtividadeFuncionarios } from './atividadeFuncionarios';

export class AtividadeDto {
  id: string = "";
  titulo: string = "";
  descricao: string = "";
  dataEntrega: string = "";
  tempoPrevisto: number = 0;
  atividadePaiId: string = "";
  categorias: string[] = [];
  atividadeFuncionarios = {} as AtividadeFuncionarios[];

  atividadeCategorias? = [] as {atividadeId: 0, categoriaId: 0}[];

}

export class AtividadeGetDto {
  id: string = "";
  titulo: string = "";
  descricao: string = "";
  dataEntrega: string = "";
  tempoPrevisto: number = 0;
  atividadePaiId: string = "";
  atividadeCategorias = [] as {atividadeId: "", categoriaId: ""}[];
  atividadeFuncionarios = {} as AtividadeFuncionarios[];

}
