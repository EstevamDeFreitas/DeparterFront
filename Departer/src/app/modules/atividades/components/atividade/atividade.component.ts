import { SnackbarComponent } from './../../../shared/components/snackbar/snackbar.component';
import { SnackBarTheme } from './../../../shared/models/snackbat.theme.enum';
import { ChecklistDto } from './../../models/checklistDto';
import { ModalAdicionarChecklistComponent } from './../modal-adicionar-checklist/modal-adicionar-checklist.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { FuncionarioService } from './../../../configuracoes/services/funcionario.service';
import { CategoriaService } from './../../../administracao/services/categoria.service';
import { FuncionarioDto } from './../../../shared/models/funcionarioDto';
import { CategoriaDto } from './../../../administracao/models/categoriaDto';
import { AtividadeDto } from './../../models/atividadeDto';
import { AtividadeService } from './../../services/atividade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {

  atividadeId: string = "";
  atividade = {} as AtividadeDto;
  horasPrevistasEmString: string = "";

  categorias: CategoriaDto[] = [];
  funcionarios: FuncionarioDto[] = [];


  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private atividadeService: AtividadeService, private categoriaService: CategoriaService, private funcionarioService: FuncionarioService, private readonly snackbarComponent: SnackbarComponent) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      // Recupera o ID da atividade a partir dos parâmetros da rota
      this.atividadeId = params['id'];

      // Recarrega os dados da atividade com o novo ID
      this.getAtividade();
    });



  }

  getAtividade(): void {

    if (this.atividadeId != null) {
      this.atividadeService.getAtividadeById(this.atividadeId).subscribe(
        (res) => {
          this.atividade = res.data;
          console.log(this.atividade);

          this.getCategorias();
          this.getFuncionarios();

          this.horasPrevistasEmString = this.transformarMinutosEmHoras(this.atividade.tempoPrevisto);
        },
        () => { },
      )
    }
  }

  getCategorias(): void {
    this.categorias = [];
    this.atividade.atividadeCategorias.forEach(e => {
      this.categoriaService.getCategoriaById(e.categoriaId).subscribe(
        (res) => {
          this.categorias.push(res.data);
        },
        () => { }
      )
    })

  }

  getFuncionarios(): void {
    this.funcionarios = [];
    this.atividade.atividadeFuncionarios.forEach(e => {
      this.funcionarioService.getFuncionarioById(e.funcionarioId).subscribe(
        (res) => {
          this.funcionarios.push(res.data);
        },
        () => { }
      )
    })
  }

  public transformarMinutosEmHoras(minutosPrevistos: number): string {

    let horas: number | string = Math.floor(minutosPrevistos / 60);
    let minutos: number | string = minutosPrevistos % 60;

    if (horas <= 9) {
      horas = "" + 0 + horas;
    }

    if (minutos <= 9) {
      minutos = "" + 0 + minutos;
    }

    return '' + horas + ':' + minutos;

  }

  public openChecklistDialog(checklist = {} as ChecklistDto ) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    dialogConfig.data = {
      checklist: checklist,
      idAtividade: this.atividadeId
    };

    const dialogRef = this.dialog.open(ModalAdicionarChecklistComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      if(data != false){
        this.ngOnInit();
        this.snackbarComponent.openSnackBar(`Subtarefa ${data} com sucesso !`,SnackBarTheme.success,3000);
      } else {
        this.snackbarComponent.openSnackBar("Erro ao adicionar subtarefa !",SnackBarTheme.success,3000);
      }

    });


  }

  public changeChecklistStatus(checkAtual: ChecklistDto){

    checkAtual.checked = !checkAtual.checked;

    this.atividadeService.putAtividadeCheck(checkAtual).subscribe(
      (res) => {},
      (err) => {}
    );

  }

  ExcluirChecklist(idCheck: string){
    this.atividadeService.deleteAtividadeCheck(idCheck).subscribe(
      ()=>{
        this.ngOnInit();
        this.snackbarComponent.openSnackBar("Subtarefa excluída com sucesso !",SnackBarTheme.success,3000);
      },
      ()=>{}
    )
  }

  public pararPropagacao(event: any){
    event.stopPropagation();
  }

  public editar() {
    this.router.navigate([`/atividades/editar-atividade/${this.atividadeId}`]);
  }

  public adicionarAtividadeFilho() {
    this.router.navigate([`/atividades/nova-atividade/${this.atividadeId}`]);
  }

  public irParaAtividadeFilha(id: string){

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([`/atividades/atividade/${id}`]));

  }

}
