import { FuncionarioDto } from '../../shared/models/funcionarioDto';
import { AtividadeDto } from './atividadeDto';
export class HorasPostDto {
  funcionarioId: string = "";
  atividadeId: string = "";
  minutos: number = 0;
}

export class HorasGetByAtividadeDto {
  id: string = "";
  funcionarioId: string = "";
  atividadeId: string = "";
  minutos: number = 0;
  
  funcionario = {} as FuncionarioDto;
}

export class HorasGetByFuncionarioDto {
  id: string = "";
  funcionarioId: string = "";
  atividadeId: string = "";
  minutos: number = 0;
  dataCriacao = {} as Date;
  atividade = {} as AtividadeDto;
}
