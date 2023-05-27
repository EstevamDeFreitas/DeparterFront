import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInformacaoNaoConfiguradoComponent } from './modal-informacao-nao-configurado.component';

describe('ModalInformacaoNaoConfiguradoComponent', () => {
  let component: ModalInformacaoNaoConfiguradoComponent;
  let fixture: ComponentFixture<ModalInformacaoNaoConfiguradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInformacaoNaoConfiguradoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInformacaoNaoConfiguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
