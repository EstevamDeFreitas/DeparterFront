import { DepartamentoDto } from './../../departamentos/models/departamentoDto';
import { ChecklistDto } from './checklistDto';
import { FuncionarioDto } from './../../shared/models/funcionarioDto';
import { CategoriaDto } from './../../administracao/models/categoriaDto';
import { AtividadeCategorias } from './atividadeCategorias';
import { AtividadePostFuncionarios, AtividadeFuncionarios } from './atividadeFuncionarios';

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
  departamento = {} as DepartamentoDto;
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
