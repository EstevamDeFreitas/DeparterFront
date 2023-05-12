import { environment } from './../../../../../environments/environment';
import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';
import { HorasService } from './../../../atividades/services/horas.service';
import { FuncionarioDto, FuncionarioDtoComConfiguracao } from './../../../shared/models/funcionarioDto';
import { FuncionarioService } from './../../../configuracoes/services/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ConfiguracaoDeHoras, ConfiguracaoDeHorasPost } from '../../models/configuracaoDeHoras';
import { Observable, forkJoin } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalConfigurarHorasComponent } from 'src/app/modules/shared/components/modal-configurar-horas/modal-configurar-horas.component';
import { SnackBarTheme } from 'src/app/modules/shared/models/snackbat.theme.enum';
import { ModalExcluirDesativarComponent } from 'src/app/modules/shared/components/modal-excluir-desativar/modal-excluir-desativar.component';

@Component({
  selector: 'app-configuracao-horas',
  templateUrl: './configuracao-horas.component.html',
  styleUrls: ['./configuracao-horas.component.scss']
})
export class ConfiguracaoHorasComponent implements OnInit {

  public environment = environment;

  funcionarios: FuncionarioDtoComConfiguracao[] = [];
  funcionariosFiltrados: FuncionarioDtoComConfiguracao[] = [];

  private _filtroLista: string = "";

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.funcionariosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.funcionarios;
  }

  public filtrarEventos(filtrarPor: string): FuncionarioDtoComConfiguracao[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.funcionarios.filter(
      (element: any) => element.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(private funcionarioService: FuncionarioService, private horasService: HorasService, public dialog: MatDialog, private snackbarComponent:SnackbarComponent) { }

  ngOnInit(): void {
    this.getAllFuncionarios();
  }

  public getAllFuncionarios(): void {
    this.funcionarioService.getAll().pipe(
      switchMap(res => {
        const funcionariosComConfiguracao = res.data.map(funcionario => {
          return this.getConfiguracaoDeHoras(funcionario.id).pipe(
            map(configHoras => {
              return {
                ...funcionario,
                configuracaoDeHoras: configHoras
              };
            })
          );
        });
        return forkJoin(funcionariosComConfiguracao);
      })
    ).subscribe(
      (funcionariosComConfiguracao) => {
        this.funcionarios = funcionariosComConfiguracao;
        this.funcionariosFiltrados = this.funcionarios;
        console.log(this.funcionarios)
      },
      ()=>{}
    );
  }

  getConfiguracaoDeHoras(funcionarioId: string): Observable<ConfiguracaoDeHoras[]> {
    return this.horasService.getConfiguracaoHoras(funcionarioId).pipe(
      map(res => res.data)
    );
  }

  checarConfiguracaoMensal(funcionario: any): any{
    return funcionario.configuracaoDeHoras.some((config: any) => config.tipoConfiguracao === 1)
  }

  devolverHorasMensal(funcionario: any): any {
    return this.transformarMinutosEmHoras(funcionario.configuracaoDeHoras.find((config: any) => config.tipoConfiguracao === 1)?.minutos)
  }

  devolverConfigMensal(algo: any) {
    const configuracaoEncontrada = algo.configuracaoDeHoras.find((config: any) => config.tipoConfiguracao === 1);
    return configuracaoEncontrada;
  }

  checarConfiguracaoDiario(funcionario: any): any{
    return funcionario.configuracaoDeHoras.some((config: any) => config.tipoConfiguracao === 0)
  }

  devolverHorasDiario(funcionario: any): any {
    return this.transformarMinutosEmHoras(funcionario.configuracaoDeHoras.find((config: any) => config.tipoConfiguracao === 0)?.minutos)
  }

  devolverConfigDiario(algo: any) {
    const configuracaoEncontrada = algo.configuracaoDeHoras.find((config: any) => config.tipoConfiguracao === 0);
    return configuracaoEncontrada;
  }

  public openConfigDialog(funcionarioId: string, tipoConfiguracao: number, configuracao?: ConfiguracaoDeHoras) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    let configuracaoDeHoras: ConfiguracaoDeHorasPost = {
      funcionarioId: funcionarioId,
      tipoConfiguracao: tipoConfiguracao,
      minutos: 0
    };

    dialogConfig.data = {configuracaoHoras: configuracaoDeHoras, configuracao: configuracao};

    const dialogRef = this.dialog.open(ModalConfigurarHorasComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

     if (data != false) {
        this.ngOnInit();
        this.snackbarComponent.openSnackBar(`Configuração ${data} com sucesso !`, SnackBarTheme.success, 3000);
      } else {
        this.snackbarComponent.openSnackBar("Erro ao adicionar configuração !", SnackBarTheme.error, 3000);
      }

    });
  }

  openExclusionDialog(configuracao: ConfiguracaoDeHoras){
    const dialogRef = this.dialog.open(ModalExcluirDesativarComponent, {data: {title: "Excluir Configuração", message: `Deseja excluir a configuração?`, confirm: "Confirmar", cancel:"Cancelar"}});

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result)
        this.deletarConfiguracao(configuracao.id);
    })

  }

  deletarConfiguracao(idConfiguracao: string){
    this.horasService.deleteHorasConfiguracao(idConfiguracao).subscribe(
      () => {
        this.snackbarComponent.openSnackBar(`Configuração excluída com sucesso !`, SnackBarTheme.success, 3000);
        this.ngOnInit();
      }
    )
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

    return '' + horas + 'h ' + minutos + 'm';

  }

  public substituirImagem(evento: Event): void {
    const imagem = evento.target as HTMLImageElement;
    imagem.onerror = null;
    imagem.src = "../../../../../assets/images/default-image.png";
  }

}
