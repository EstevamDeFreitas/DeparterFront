import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoHorasComponent } from './resumo-horas.component';

describe('ResumoHorasComponent', () => {
  let component: ResumoHorasComponent;
  let fixture: ComponentFixture<ResumoHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumoHorasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
