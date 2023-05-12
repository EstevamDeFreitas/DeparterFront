import { ConfiguracaoDeHoras } from "../../administracao/models/configuracaoDeHoras";

export class FuncionarioDto {
   id: string = "";
   nome: string = "";
   email: string = "";
   senha: string = "";
   apelido: string = "";
   imagem: string = "";
   isAdmin: boolean = false;

   nivelAcesso?: number;
}

export interface FuncionarioDtoComConfiguracao extends FuncionarioDto {
  configuracaoDeHoras: ConfiguracaoDeHoras[];
}
