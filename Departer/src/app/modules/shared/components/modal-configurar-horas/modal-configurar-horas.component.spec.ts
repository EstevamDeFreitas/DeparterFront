import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfigurarHorasComponent } from './modal-configurar-horas.component';

describe('ModalConfigurarHorasComponent', () => {
  let component: ModalConfigurarHorasComponent;
  let fixture: ComponentFixture<ModalConfigurarHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfigurarHorasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfigurarHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
