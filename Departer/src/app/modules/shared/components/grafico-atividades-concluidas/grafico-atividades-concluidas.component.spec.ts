import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoAtividadesConcluidasComponent } from './grafico-atividades-concluidas.component';

describe('GraficoAtividadesConcluidasComponent', () => {
  let component: GraficoAtividadesConcluidasComponent;
  let fixture: ComponentFixture<GraficoAtividadesConcluidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoAtividadesConcluidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoAtividadesConcluidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
