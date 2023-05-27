import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirDesativarComponent } from './modal-excluir-desativar.component';

describe('ModalExcluirDesativarComponent', () => {
  let component: ModalExcluirDesativarComponent;
  let fixture: ComponentFixture<ModalExcluirDesativarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExcluirDesativarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExcluirDesativarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
