
export class GraficoAtividadesConcluidasDto {
    finalizadas: number = 0;
    atrasadas: number = 0;
    pendente: number = 0;
    emDesenvolvimento: number = 0;
 }
 
 export class GraficoHorasCategoriasDto {
    categoria: string = "";
    horasPorMes: HorasPorMesDTO[] = [];
 }
 
 export class HorasPorMesDTO {
   data: string = "";
   valor: any[] = [];
 }