import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from './../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioDto } from 'src/app/modules/shared/models/funcionarioDto';

@Component({
  selector: 'app-novo-departamento',
  templateUrl: './novo-departamento.component.html',
  styleUrls: ['./novo-departamento.component.scss']
})
export class NovoDepartamentoComponent implements OnInit {

  departamentoForm!: FormGroup;
  funcionariosLista: FuncionarioDto[] = [];


  get f(): any {
    return this.departamentoForm.controls;
  }

  constructor(private router: Router,private route: ActivatedRoute,public dialog: MatDialog,private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.formValidation();
  }

  public formValidation() {
   
    this.departamentoForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      maximoHorasDiarias: new FormControl('', [Validators.required]),
      maximoHorasMensais: new FormControl('', [Validators.required]),
    });
  }

  public openFuncionarioDialog() {
    /*
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    dialogConfig.data = this.funcionariosLista;

    const dialogRef = this.dialog.open(ModalAdicionarFuncionariosComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      data.forEach((element: FuncionarioDto) => {
        this.funcionariosLista.push(element);
      });

    });*/
  }

  cancelar(){
    this.router.navigate(['/departamentos/lista-departamentos']);
  }

}
