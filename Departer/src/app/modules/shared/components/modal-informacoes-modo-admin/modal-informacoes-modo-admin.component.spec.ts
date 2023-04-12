import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInformacoesModoAdminComponent } from './modal-informacoes-modo-admin.component';

describe('ModalInformacoesModoAdminComponent', () => {
  let component: ModalInformacoesModoAdminComponent;
  let fixture: ComponentFixture<ModalInformacoesModoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInformacoesModoAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInformacoesModoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
