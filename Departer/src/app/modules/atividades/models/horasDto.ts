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
}

export class HorasGetByFuncionarioDto {
  id: string = "";
  funcionarioId: string = "";
  atividadeId: string = "";
  minutos: number = 0;
  dataCriacao = {} as Date;
  atividade = {} as AtividadeDto;
}
