import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarFuncionariosComponent } from './modal-adicionar-funcionarios.component';

describe('ModalAdicionarFuncionariosComponent', () => {
  let component: ModalAdicionarFuncionariosComponent;
  let fixture: ComponentFixture<ModalAdicionarFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdicionarFuncionariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdicionarFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
