import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInformacoesComponent } from './modal-informacoes.component';

describe('ModalInformacoesComponent', () => {
  let component: ModalInformacoesComponent;
  let fixture: ComponentFixture<ModalInformacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInformacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInformacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
