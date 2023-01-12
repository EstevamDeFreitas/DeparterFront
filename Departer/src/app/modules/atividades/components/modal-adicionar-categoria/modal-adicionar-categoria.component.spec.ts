import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarCategoriaComponent } from './modal-adicionar-categoria.component';

describe('ModalAdicionarCategoriaComponent', () => {
  let component: ModalAdicionarCategoriaComponent;
  let fixture: ComponentFixture<ModalAdicionarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdicionarCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdicionarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
