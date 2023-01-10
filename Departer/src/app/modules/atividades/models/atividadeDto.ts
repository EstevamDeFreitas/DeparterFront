import { CategoriaDto } from './../../administracao/models/categoriaDto';

export class AtividadeDto {
  id: string = "";
  titulo: string = "";
  descricao: string = "";
  dataEntrega: string = "";
  tempoPrevisto: number = 0;
  atividadePaiId: string = "";
  categorias = {} as CategoriaDto[] ;

}
