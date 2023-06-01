import { FuncionarioService } from 'src/app/modules/configuracoes/services/funcionario.service';
import { ModoAdminService } from './../../../shared/services/modo-admin.service';
import { DepartamentoService } from './../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/modules/shared/components/snackbar/snackbar.component';
import { DepartamentoDto } from '../../models/departamentoDto';
import { SnackBarTheme } from 'src/app/modules/shared/models/snackbat.theme.enum';
import { FuncionarioDto } from 'src/app/modules/shared/models/funcionarioDto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-departamentos',
  templateUrl: './lista-departamentos.component.html',
  styleUrls: ['./lista-departamentos.component.scss']
})
export class ListaDepartamentosComponent implements OnInit {

  departamentos: any;

  modoAdmin: boolean = false;

  funcionario!: FuncionarioDto;
  loading: boolean = false;

  public environment = environment;

  constructor(private router: Router,private route: ActivatedRoute,private departamentoService: DepartamentoService,private readonly snackbarComponent: SnackbarComponent, private modoAdminService: ModoAdminService, private funcionarioService:FuncionarioService) { }

  ngOnInit(): void {
    this.modoAdminService.modoAdmin$.subscribe(
      modoAdmin => {
        this.modoAdmin = modoAdmin;

        this.getDepartamentos();
        this.getFuncionarioLogado();
      }
    );


  }

  getDepartamentos(){
    
    this.loading=true;
    this.departamentoService.getDepartamentos(this.modoAdmin).subscribe({
      next: (response) => {
        this.departamentos = response.data;
        
        this.loading=false;
      },
      error: (response) => {
        this.snackbarComponent.openSnackBar("Não foi encontrado nenhum Departamento cadastrado!", SnackBarTheme.error, 3000);
        
        this.loading=false;
      }
    })
  }

  getFuncionarioLogado(){
    this.funcionarioService.getFuncionarioLogado().subscribe(
      (res) => {
        this.funcionario = res.data;
      },
      (err) => {
      }
    )
  }

  public substituirImagemDepartamento(evento: Event): void {
    const imagem = evento.target as HTMLImageElement;
    imagem.onerror = null;
    imagem.src = "../../../../../assets/images/defaultDpto.png";
  }

  novoDepartamento(){
    this.router.navigate(['/departamentos/novo-departamento']);
  }

  detalhesDepartamento(id: string){
    this.router.navigate([`/departamentos/geral-departamentos/${id}`]);
  }

}
