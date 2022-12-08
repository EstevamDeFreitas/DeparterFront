export class CategoriaDto {

    nome: string;
    cor: string;

    constructor(public _nome: string, public _cor: string){
        this.nome = _nome;
        this.cor = _cor;
    }

}
