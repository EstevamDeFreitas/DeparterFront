import { DepartamentoDto } from './departamentoDto';

import { FuncionarioDto } from './../../shared/models/funcionarioDto';
import { CategoriaDto } from './../../administracao/models/categoriaDto';
import { ChecklistDto } from '../../atividades/models/checklistDto';
import { AtividadeCategorias } from '../../atividades/models/atividadeCategorias';
import { AtividadeFuncionarios, AtividadePostFuncionarios } from '../../atividades/models/atividadeFuncionarios';


export class AtividadeDto {
  id: string = "";
  titulo: string = "";
  descricao: string = "";
  dataEntrega: string = "";
  tempoPrevisto: number = 0;
  departamentoId: string = "";
  atividadePaiId: string = "";
  atividadeChecks = {} as ChecklistDto[];
  atividadeCategorias = {} as AtividadeCategorias[];
  atividadeFuncionarios = {} as AtividadeFuncionarios[];
  atividades = {} as AtividadeDto[];
  departamento: DepartamentoDto | null = null;
}

export class AtividadePostDto {
  id: string = "";
  titulo: string = "";
  descricao: string = "";
  dataEntrega: string = "";
  departamentoId: string = "";
  tempoPrevisto: number = 0;
  atividadePaiId: string = "";
  categorias: string[] = [];
  atividadeFuncionarios = {} as AtividadePostFuncionarios[];
}

export class GetAtividadeByDepartamentoId {
  dataEntrega: string = "";
  descricao: string = "";
  funcionario: string = "";
  statusAtividade: number = 0;
  id: string = "";
  titulo: string = "";
}

export class AtividadeListDto {
  id: string = "";
  titulo: string = "";
  descricao: string = "";
  dataEntrega: string = "";
  tempoPrevisto: number = 0;
  atividadePaiId: string = "";
  atividadeCategorias = {} as AtividadeCategorias[];
  atividadeFuncionarios = {} as AtividadeFuncionarios[];

  categorias: CategoriaDto[] = [];
  funcionarios: FuncionarioDto[] = [];
}
