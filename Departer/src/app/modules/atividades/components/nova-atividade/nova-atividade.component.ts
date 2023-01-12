import { CategoriaDto } from './../../../administracao/models/categoriaDto';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalAdicionarCategoriaComponent } from './../modal-adicionar-categoria/modal-adicionar-categoria.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nova-atividade',
  templateUrl: './nova-atividade.component.html',
  styleUrls: ['./nova-atividade.component.scss']
})
export class NovaAtividadeComponent implements OnInit {

  dataAtual: Date = new Date();
  data: Date | null = null;
  categorias: CategoriaDto[] = [];

  atividadeForm!: FormGroup;

  get f(): any {
    return this.atividadeForm.controls;
  }

  constructor(private router: Router,private route: ActivatedRoute,private dateAdapter: DateAdapter<Date>, public dialog: MatDialog) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    this.formValidation();
    this.maskDate();

    console.log(this.categorias == null);
  }

  public formValidation() {
    this.atividadeForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      dataEntrega: new FormControl('', [Validators.required]),
      tempoPrevisto: new FormControl('', [Validators.required]),
    });
  }

  maskDate() {
    // Mask Date Input
    var input = document.querySelectorAll('.mask-date')[0];
    var dateInputMask = function dateInputMask(elm: any ) {
      if(elm !== undefined){
      elm.addEventListener('keypress', function(e: any) {
        if(e.keyCode < 47 || e.keyCode > 57) {
          e.preventDefault();
        }

        var len = elm.value.length;
        if(len !== 1 || len !== 3) {
          if(e.keyCode == 47) {
            e.preventDefault();
          }
        }
        if(len === 2) {
          elm.value += '/';
        }
        if(len === 5) {
          elm.value += '/';
        }
      });
    }
    };
    dateInputMask(input);
  }

  openDialog(){

    //TODO: Nao deixar o cara clicar para sair do modal!

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    dialogConfig.data = this.categorias;

    const dialogRef = this.dialog.open(ModalAdicionarCategoriaComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      data.forEach((element: CategoriaDto) => {
        this.categorias.push(element);
      });

    });
  }

  hoverNaCategoria(i: number, flag: number){
    let categoriaSelecionadaAtual = document.getElementById(`icon${i}`) as HTMLElement;

    if(flag == 1)
      categoriaSelecionadaAtual.style.display = "inline"
    else {
      categoriaSelecionadaAtual.style.display = "none"
    }

  }

  excluirCategoria(categoriaId: string){
    let index = this.categorias.map(e=>e.id).indexOf(categoriaId);
    this.categorias.splice(index, 1);
  }


  cancelar(){
    this.router.navigate(['/atividades/lista-atividades']);
  }

  public atividadeCriada(): void {
    /*
    //TRATAR DATA - PADRÃO API

    //CONVERTE A DATA PARA O PADRÃO AMERICANO PORÉM AGORA UTC
    let novaData: any;
    novaData  = this.data?.toJSON();
   console.log(novaData);

   //ESSA FUNÇÃO TEM QUE SER ADABTADA MAS VAI SERVIR CASO O PADRÃO TENHA QUE SER BRASILEIRO NO BACK
   PADRÃO QUE ESTA 2023-1-13
   PADRÃO BRASILEIRO 13-1-2023
    formatDate2(date: string | null) {
    if (date !== null && date !== '') {
      const day: string = date.split("-")[2];
      const month: string = date.split("-")[1];
      const year: string = date.split("-")[0];

      const newDate: string = `${day}/${month}/${year}`;

      return newDate;
    } else {
      return date;
    }
  }
   */
    this.router.navigate(['/atividades/atividade'])
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched }
  }

}
