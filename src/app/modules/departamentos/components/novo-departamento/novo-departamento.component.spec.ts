import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoDepartamentoComponent } from './novo-departamento.component';

describe('NovoDepartamentoComponent', () => {
  let component: NovoDepartamentoComponent;
  let fixture: ComponentFixture<NovoDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoDepartamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
