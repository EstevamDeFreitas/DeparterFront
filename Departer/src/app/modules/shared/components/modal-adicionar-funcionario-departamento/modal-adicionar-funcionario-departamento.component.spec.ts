import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarFuncionarioDepartamentoComponent } from './modal-adicionar-funcionario-departamento.component';

describe('ModalAdicionarFuncionarioDepartamentoComponent', () => {
  let component: ModalAdicionarFuncionarioDepartamentoComponent;
  let fixture: ComponentFixture<ModalAdicionarFuncionarioDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdicionarFuncionarioDepartamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdicionarFuncionarioDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
