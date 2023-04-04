export class ConfiguracaoDeHoras {
  id: string = "";
  funcionarioId: string = "";
  tipoConfiguracao: number = 0;
  minutos: number = 0;
}

export class ConfiguracaoDeHorasPost {
  funcionarioId: string = "";
  tipoConfiguracao: number = 0;
  minutos: number = 0;
}
