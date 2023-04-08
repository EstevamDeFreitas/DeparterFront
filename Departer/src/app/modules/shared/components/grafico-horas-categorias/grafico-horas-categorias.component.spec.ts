import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoHorasCategoriasComponent } from './grafico-horas-categorias.component';

describe('GraficoHorasCategoriasComponent', () => {
  let component: GraficoHorasCategoriasComponent;
  let fixture: ComponentFixture<GraficoHorasCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoHorasCategoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoHorasCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
