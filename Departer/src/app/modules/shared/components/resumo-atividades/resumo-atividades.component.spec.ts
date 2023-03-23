import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoAtividadesComponent } from './resumo-atividades.component';

describe('ResumoAtividadesComponent', () => {
  let component: ResumoAtividadesComponent;
  let fixture: ComponentFixture<ResumoAtividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumoAtividadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoAtividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
